const router = require("express").Router();

const schemas = require("../validators/authValidator");
const verify = require("./verifyToken");

const { validationMiddleware } = require("../middlewares/validation");

const { postLogin, postRegister } = require("../controller/authController");

router.post(
  "/register",
  validationMiddleware(schemas.registerValidation),
  postRegister
);

router.post("/login", validationMiddleware(schemas.loginValidation), postLogin);

router.post("/verify", verify, (req, res) => {
  res.send({ token: req.token, user: req.user }).status(200);
});

module.exports = router;
