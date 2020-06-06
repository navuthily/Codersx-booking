var express = require('express')
var router = express.Router();
const {userAuth}=require('../middleware/auth.middleware')
const{
  getPost, 
  getCreate,
  postCreate,
  
}=require('../controllers/post.controller')
const {
  uploadMulter,
} = require('../models/multer');

const {isAdmin,isNotAdmin}=require('../middleware/isAdmin.middleware')
router.get("/",getPost);

//router.get("/search", getSearch);
router.get("/create", userAuth,isAdmin,getCreate);
router.post("/create",userAuth,isAdmin,uploadMulter.single('imagePost'), postCreate);
// router.get("/view/:id", viewDetailBook);
// router.delete("/delete/:id", deleteBook);
//router.post('/edit/:id',uploadMulter.single('cover'), editBook)
module.exports = router;