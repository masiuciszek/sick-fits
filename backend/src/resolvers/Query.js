const Query = {
  dogs(parent, args, ctx, info) {
    return [{ name: 'apa' }, { name: 'kingen' }];
  },
};

module.exports = Query;
