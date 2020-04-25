var express = require('express')
var router = express.Router()
const{
 getLogin,postLogin
}=require('../controllers//auth.controller')
router.get("/login",getLogin);
router.post("/login",postLogin);



module.exports = router;