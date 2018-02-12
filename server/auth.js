const jwt = require('jsonwebtoken');
const config = require('../config');
const userModel = require('./db/mongo/model').user;
const md5 = require('md5');

/**
 * Validate a token string
 * @param {String} token Token string
 */
const verify = token => {
  try {
    return jwt.verify(token, config.jwt.secret);
  } catch (e) {
    console.error('JWT ERROR', e.message);
    return false;
  }
};

/**
 * Sign a new token
 * @param {Object} data Data to attach to jwt token
 */
const sign = data => {
  return jwt.sign(
    Object.assign(
      { exp: Math.floor(Date.now() / 1000) + config.jwt.exp * 3600 },
      data
    ),
    config.jwt.secret
  );
};

/**
 * Validate a user
 * @param {String} username Username / E-mail
 * @param {String} password Password
 */
const userValidation = async (username, password) => {
  const user = await userModel
    .findOne({ $or: [{ email: username }, { name: username }] })
    .exec((err, data) => data);
  if (user && user.password === md5(password))
    return delete user['password'] && user;
  return false;
};

module.exports = { verify, sign, userValidation };
