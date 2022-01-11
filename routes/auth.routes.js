const express = require('express')

const { checkDuplicate, accessAuthUser } = require("../Middlewares/verifyRegistration");
const authController = require("../controllers/auth.controllers");
const validation = require('../Middlewares/validation')
const userSchema = require('../Validations/userValidation')
const router = express.Router()

router.post(
  '/signup',
  validation(userSchema),
  checkDuplicate,
  authController.createUser
);

router.post('/signin', authController.authUser);
router.get('/users', accessAuthUser, authController.getUsers)
router.put('/user', accessAuthUser, authController.updateUser)
router.delete('/user', accessAuthUser, authController.deleteUser)

module.exports = router