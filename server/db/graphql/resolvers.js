const resolverMap = {
  Query: {
    async articles(prev, args, context) {
      const articles = new context.db.Articles();
      return await articles.readArticles(args.skip, args.limit);
    },
    async article(prev, args, context) {
      const article = new context.db.Article();
      return await article.readArticle(args.id);
    },
  },
  Mutation: {
    async postUpvote(prev, args, context) {
      const article = new context.db.PostLike();
      return await article.upvote(args.id, args.likes);
    },
    async createToken(prev, args, context) {
      const auth = new context.db.jwtToken();
      return await auth.createToken(args.username, args.password);
    },
  },
};

module.exports = resolverMap;
