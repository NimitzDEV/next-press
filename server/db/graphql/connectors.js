const ArticleModel = require('../mongo/model').article;
const auth = require('../../auth');

/**
 * Retrive article list
 * query articles
 */
class Articles {
  constructor() {
    this.readArticles = async (skip, limit) => {
      const articles = await ArticleModel.find({})
        .populate('author')
        .sort({ _id: -1 })
        .limit(limit)
        .skip(skip)
        .exec();
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
    this.readArticle = async id => {
      const article = await ArticleModel.findOne({ _id: id })
        .populate('author')
        .exec();
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
    this.upvote = async (id, likes) => {
      const article = await ArticleModel.findOneAndUpdate(
        { _id: id },
        { likes: likes }
      ).exec();
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
