var express = require('express')
var router = express.Router()
const {
  getUser,
  getSearch,
  getCreate,
  postCreate,
  viewDetailUser,
  deleteUser,
  editProfile,
  editUser,
  getEditProfile
} = require('../controllers/user.controller');

const {
  uploadMulter,
} = require('../models/multer');
router.get("/", getUser);
router.get("/search", getSearch);
router.get("/create", getCreate);
router.post("/create", postCreate);
router.get('/editprofile',getEditProfile)
router.get("/view/:id", viewDetailUser);
router.delete("/delete/:id", deleteUser);
router.post('/edit/:id', uploadMulter.single('avatar'), editUser)
router.post('/editprofile', uploadMulter.single('avatar'), editProfile)
module.exports = router;