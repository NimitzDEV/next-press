const ArticleModel = require('../mongo/model').article;
const auth = require('../../auth');

/**
 * Retrive article list
 * query articles
 */
class Articles {
  constructor() {
    this.readArticles = (skip, limit) => {
      const articles = ArticleModel.find({})
        .populate('author')
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip)
        .exec((err, data) => data);
      return articles;
    };
  }
}

/**
 * Retrive a single article
 * query article
 */
class Article {
  constructor() {
    this.readArticle = id => {
      const article = ArticleModel.findOne({ _id: id })
        .populate('author')
        .exec((err, data) => data);
      return article;
    };
  }
}

/**
 * up vote an article
 * mutation postlike
 */
class PostLike {
  constructor() {
    this.upvote = (id, likes) => {
      const article = ArticleModel.findOneAndUpdate(
        { _id: id },
        { likes: likes }
      ).exec((err, data) => data);
      return article;
    };
  }
}

/**
 * verify or issue a jwt token
 * mutation createToken
 */
class jwtToken {
  constructor() {
    this.createToken = async (username, password) => {
      const user = await auth.userValidation(username, password);
      if (!user) return { status: false, msg: 'auth failed' };
      const tokenData = { id: user._id };
      return {
        status: true,
        token: auth.sign(tokenData),
        msg: 'Login ok, welcome ' + user.name,
      };
    };
    this.validateToken = token => auth.verify(token);
  }
}

module.exports = { Articles, Article, PostLike, jwtToken };
