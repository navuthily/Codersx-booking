var express = require('express')
var router = express.Router();
const{
  getBook,
  getSearch,
  getCreate,
  postCreate,
  viewDetailBook,
  deleteBook,
  editBook
}=require('../controllers/book.controller')
router.get("/",getBook);
// router.get("/search", getSearch);
// router.get("/create", getCreate);
// router.post("/create", postCreate);
// router.get("/view/:id", viewDetailBook);
// router.delete("/delete/:id", deleteBook);
// router.put('/edit/:id', editBook)


module.exports = router;