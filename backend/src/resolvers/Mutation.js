const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

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
};

module.exports = Mutations;
