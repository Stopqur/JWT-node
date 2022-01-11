const jwt = require('jsonwebtoken')

const db = require("../models");
const { secret } = require('../config/auth.config')

const User = db.user;

exports.checkDuplicate = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Пользователь с таким именем уже существует!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Пользователь с таким email уже существует!"
        });
        return;
      }
      next();
    });
  });
};

exports.accessAuthUser = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if(!token) {
      res.status(403).json({ message: 'Вы не авторизованы'})
    }
    const decodedData = jwt.verify(token, secret)
    req.user = decodedData
    next()
  } catch(e) {
      res.status(403).json({error: e})
      console.log('request', req.headers.authorization())
  }
}
