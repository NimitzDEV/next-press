const resolverMap = {
  Query: {
    articles(prev, args, context) {
      const articles = new context.db.Articles();
      return articles.readArticles(args.skip, args.limit);
    },
    article(prev, args, context) {
      const article = new context.db.Article();
      return article.readArticle(args.id);
    },
  },
  Mutation: {
    postUpvote(prev, args, context) {
      const article = new context.db.PostLike();
      return article.upvote(args.id, args.likes);
    },
    createToken(prev, args, context) {
      const auth = new context.db.jwtToken();
      return auth.createToken(args.username, args.password);
    },
  },
};

module.exports = resolverMap;
