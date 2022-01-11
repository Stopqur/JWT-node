const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken");

const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;

exports.createUser = (req, res) => {
    try {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, 'secret key 123').toString(),
            dob: req.body.dob
        }).then(user => {
            res.send({ message: "User was registered successfully!" });
        })
    } catch(err) {
        res.status(500).send({ message: err.message });
    }
};

exports.authUser = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(user => {
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    
    const decryptPassword = CryptoJS.AES.decrypt(user.password, 'secret key 123')
          .toString(CryptoJS.enc.Utf8)

    if (decryptPassword !== req.body.password) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 43200
    });
    res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        accessToken: token
    })
  })
  .catch (err => {
    res.status(500).send({ message: err.message });
  });
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({ raw: true })
        res.json(users)
    } catch(e) {
        res.status(400).json({ message: e })
    }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username }})
    const newUser = await user.update({
      email: req.body.email
    })
    res.json(newUser)
  } catch(e) {
    res.status(400).json({message: e})
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username}})
    await user.destroy()
    res.json(user)
  } catch(e) {
    res.status(400).json({message: "Не удалось найти пользователя"})
  }
}