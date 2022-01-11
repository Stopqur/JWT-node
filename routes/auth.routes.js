const express = require('express')

const { verifyReg } = require("../Middlewares");
const controller = require("../controllers/auth.controllers");
const validation = require('../Middlewares/validation')
const userSchema = require('../Validations/userValidation')

const router = express.Router()

router.post(
  "/signup",
  validation(userSchema),
  [verifyReg.checkDuplicate],
  controller.createUser
);

router.post("/signin", controller.authUser);

module.exports = router