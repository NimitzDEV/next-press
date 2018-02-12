const mongoose = require('mongoose')

const _userSchema = {
  name: String,
  desc: String,
  email: String,
  website: String,
  password: String
}

const _articleSchema = {
  publishDate: Date,
  lastModified: Date,
  title: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  content: Array,
  likes: Number
}

const _userModel = new mongoose.Schema(_userSchema)
const _articleModel = new mongoose.Schema(_articleSchema)

module.exports = {
  article: mongoose.model('article', _articleModel),
  user: mongoose.model('user', _userModel)
}
