const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

exports.authenticate = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne(
      { email: email },
      '-__v -createdAt -updatedAt'
    );

    if (user) {
      bcrypt.compare(password, user.password, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        if (response) {
          delete user._doc.password;

          const expireIn = 24 * 60 * 60;
          const token = jwt.sign(
            {
              user: user
            },
            SECRET_KEY,
            {
              expiresIn: expireIn
            }
          );

          res.cookie('token', token, { httpOnly: true });
          return res.redirect('/dashboard');

        }

        return res.status(403).json('wrong_credentials');
      });
    } else {
      return res.status(404).json('user_not_found');
    }
  } catch (error) {
    return res.status(501).json(error);
  }
};