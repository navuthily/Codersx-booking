var express = require('express')
var router = express.Router()
const{
  getUser,
  getSearch,
  getCreate,
  postCreate,
  viewDetailUser,
  deleteUser,
  editUser
}=require('../controllers/user.controller')
router.get("/", getUser);
router.get("/search",getSearch );
router.get("/create",getCreate);
router.post("/create",postCreate);
router.get("/view/:id",viewDetailUser);
router.delete("/delete/:id",deleteUser);
router.put('/edit/:id', editUser)


module.exports = router;