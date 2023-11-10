var express = require('express');
var router = express.Router();
const loginController = require("../controllers/loginController")
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', loginController.login);
router.get('/logout', loginController.logout);
//router.get('/signup', loginController.signup);
//router.post('/signup', loginController.storeUser);
//router.get('/recuperar-contrasena', loginController.resetPwd);
router.post('/auth', loginController.auth);

module.exports = router;