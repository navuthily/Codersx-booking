var express = require('express')
var router = express.Router();
const {userAuth}=require('../middleware/auth.middleware')
const{
  getPost, 
  getCreate,
  postCreate,
  getComment,
  postComment,
  getApiPost
}=require('../controllers/post.controller')
const {
  uploadMulter,
} = require('../models/multer');

const {isAdmin,isNotAdmin}=require('../middleware/isAdmin.middleware')
router.get("/",getPost);
router.get("/api",getApiPost);

router.get("/create", userAuth,isAdmin,getCreate);
router.post("/create",userAuth,isAdmin,uploadMulter.single('imagePost'), postCreate);
router.get('/comment/:postId', userAuth, getComment)
router.post('/comment/:postId', userAuth,postComment)
module.exports = router;