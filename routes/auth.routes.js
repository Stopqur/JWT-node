const { verifyReg } = require("../Middlewares");
const controller = require("../controllers/auth.controllers");
const validation = require('../Middlewares/validation')
const userSchema = require('../Validations/userValidation')

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    validation(userSchema),
    [verifyReg.checkDuplicate],
    controller.createUser
  );

  app.post("/auth/signin", controller.authUser);
};