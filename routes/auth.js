var express = require('express')
var router = express.Router()
const {
  getLogin,
  postLogin,
  getRegister,
  postRegister
} = require('../controllers//auth.controller')
const {userIsNotAuth}=require('../middleware/auth.middleware')
router.route('/register')
  .get( getRegister)
  .post( postRegister);
router.route('/login')
    .get(getLogin)
    .post(postLogin);
module.exports = router;