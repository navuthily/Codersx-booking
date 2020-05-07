var express = require('express')
var router = express.Router();
const{
  getBook,
  create,
  getSearch,
  getCreate,
  postCreate,
  viewDetailBook,
  deleteBook,
  editBook
}=require('../controllers/book.controller')
const {
  uploadMulter,
} = require('../models/multer');
router.get("/",getBook);
router.post('/oke',create)
router.get("/search", getSearch);
router.get("/create", getCreate);
router.post("/create",uploadMulter.single('cover'), postCreate);
router.get("/view/:id", viewDetailBook);
router.delete("/delete/:id", deleteBook);
router.post('/edit/:id',uploadMulter.single('cover'), editBook)
module.exports = router;