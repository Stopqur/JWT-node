const express = require('express')

const accessAuthUser = require("../middlewares/accessAuthUser");
const checkDuplicate = require('../middlewares/checkDuplicate')
const authController = require("../controllers/auth.controllers");
const validation = require('../middlewares/validationReqData')
const userSchema = require('../validations/userValidation')

const router = express.Router()

router.post(
  '/sign-up',
  validation(userSchema),
  checkDuplicate,
  authController.createUser
);

router.post('/sign-in', authController.authUser);
router.get('/users', accessAuthUser, authController.getUsers)
router.put('/user/:id', accessAuthUser, authController.updateUser)
router.delete('/user/:id', accessAuthUser, authController.deleteUser)

module.exports = router