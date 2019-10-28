const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeNiceTemplateEmail } = require('../mail');
const { hasPermission } = require('../utils');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in');
    }
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          // Relationship between item and user
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
          ...args,
        },
      },
      info
    );

    console.log(item);

    return item;
  },
  updateItem(parent, args, { db }, info) {
    const updates = { ...args };
    delete updates.id;
    return db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      // so it know what to return
      info
    );
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };

    const item = await ctx.db.query.item({ where }, `{ id title user { id }}`);

    const ownsItem = item.user.id === ctx.request.userId;

    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );

    if (!ownsItem && hasPermissions) {
      throw new Error('you are not allowed to delete the item');
    }

    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async deleteUser(parent, args, { db }, info) {
    const where = { id: args.id };
    const item = await db.query.user({ where }, `{id}`);
    return db.mutation.deleteUser({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    // lowercase their email
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create the user in the database
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    // create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });

    return user;
  },

  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    // from the cookieparser package

    ctx.response.clearCookie('token');

    return { message: `Bye bye` };
  },

  async requestReset(parent, args, ctx, info) {
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    const mailResponse = await transport.sendMail({
      from: 'marcellciszek24@gmail.com',
      to: user.email,
      subject: 'your password Reset',
      html: makeNiceTemplateEmail(
        `Your password Reset Token is here!! \n\n <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">Click here </a> `
      ),
    });

    return { message: 'Thank you!' };
  },
  async resetPassword(parent, args, ctx, info) {
    if (args.password !== args.confirmPassword) {
      throw new Error('no matching password');
    }
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error('Authentication denied');
    }
    const password = await bcrypt.hash(args.password, 10);
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    return updatedUser;
  },

  async updatePermissions(parent, args, { request, db }, info) {
    if (!request.userId) {
      throw new Error('You must be logged in');
    }
    const currentUser = await db.query.user(
      {
        where: {
          id: request.userId,
        },
      },
      info
    );

    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
    return db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
  async addToCart(parent, args, { db, request }, info) {
    const { userId } = request;
    const [existingCartItem] = await db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    });
    if (existingCartItem) {
      return db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        },
        info
      );
    }
    return db.mutation.createCartItem(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          item: {
            connect: { id: args.id },
          },
        },
      },
      info
    );
  },
  async removeFromCart(parent, args, { db, request }, info) {
    const cartItem = await db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{id, user {id}}`
    );
    if (!cartItem) throw new Error('no Cart item found');

    if (cartItem.user.id !== request.userId) {
      throw new Error('hey cheeting huuh');
    }
    return db.mutation.deleteCartItem(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
