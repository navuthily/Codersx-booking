var express = require('express')
var router = express.Router()
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ books: []}).write();
 // for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
var books = db.get("books");


router.get("/", (request, response) => {
  response.send("I love CodersX");
});
router.get("/books", function(req, res) {

  res.render("index", { books: books.value()});

});
router.get("/search", function(req, res) {
  var q = req.query.q;
  var matched = books.value().filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index", { books: matched });
});
router.get("/create", function(req, res) {
  res.render("create");
});
router.post("/create", function(req, res) {
  req.body.id = shortid.generate();

  books.push(req.body).write();
  return res.redirect("/user/books");
});
router.get("/view/:id", function(req, res) {
  var id = req.params.id;
  var book = books.find({ id: id }).value();
  return res.render("view", { book });
});
router.delete("/delete/:id", function(req, res) {
  var id = req.params.id;
  books
    .remove({ id: id })
    .write();
  return res.redirect("/user/books");
});
router.put('/edit/:id', function(req,res){
  var id=req.params.id;
  books
  .find({ id:id})
  .assign({ title: req.body.title})
  .write();
  return res.redirect("/user/books");
})


module.exports = router;