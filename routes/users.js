var express = require('express')
var router = express.Router()
const {
  getUser,
  getSearch,
  getCreate,
  postCreate,
  viewDetailUser,
  deleteUser,
  editUser,
  getEdit
} = require('../controllers/user.controller')

const {
  uploadMulter,
} = require('../models/multer');
router.get("/", getUser);
router.get("/search", getSearch);
router.get("/create", getCreate);
router.post("/create", postCreate);
router.get("/view/:id", viewDetailUser);
router.delete("/delete/:id", deleteUser);
router.put('/edit/:id',editUser)
router.get('/edit', getEdit)
router.put('/edit',editUser)
module.exports = router;