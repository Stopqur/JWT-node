const db = require("../models");

const User = db.user;

const checkDuplicate = async(req, res, next) => {
  try {
    // Username
    const user = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (user) {
      return res.status(400).json({
        message: "User with this name is exist!"
      });
    }
  
    // Email
    const userByEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (userByEmail) {
      res.status(400).send({
        message: "User with this email is exist!"
      });
      return;
    }
    next()
  } catch(e) {
    res.status(400).json({ message: e })
  }
};

module.exports = checkDuplicate