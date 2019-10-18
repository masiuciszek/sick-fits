const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {
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
  async deleteItem(parent, { args }, { db }, info) {
    const where = { id: args.id };
    const item = await db.query.item({ where }, `{id title}`);

    return db.mutation.deleteItem({ where }, info);
    // item
  },
  async deleteUser(parent, args, { db }, info) {
    const where = { id: args.id };
    const item = await db.query.user({ where }, `{id}`);
    return db.mutation.deleteUser({ where }, info);
  },

  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();

    const password = await bcrypt.hash(args.password, 10);

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
    const token = await jwt.sign({ userId: user.id }, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });
    return user;
  },
};

module.exports = Mutations;
