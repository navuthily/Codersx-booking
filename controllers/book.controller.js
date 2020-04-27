const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ books: []}).write();
 // for parsing routerlication/x-www-form-urlencoded
 db.defaults({ users: []}).write();
const shortid = require("shortid");
var books = db.get("books");
const getBook= function(req, res) {
  var perPage = 8;
  var page = parseInt(req.query.page) || 1;
  var start = (page -1) * perPage;
  var end = page *perPage;
  var user=db.get('users').find({id:req.signedCookies.userId}).value();
  res.render("books/index", { books: books.value().slice(start,end), user:user});

};
const getSearch=function(req, res) {
  var q = req.query.q;
  var user=db.get('users').find({id:req.signedCookies.userId}).value();
  var matched = books.value().filter(function(book) {
    return book.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("books/index", { books: matched, user: user});
};
const getCreate=function(req, res) {
  var user =db.get('users').find({id:req.signedCookies.userId}).value();
  res.render("books/create",{user });
};
const postCreate=function(req, res) {
  req.body.id = shortid.generate();
  books.push(req.body).write();
  return res.redirect("/book");
};
const viewDetailBook=function(req, res) {
  var user =db.get('users').find({id:req.signedCookies.userId}).value();
  var id = req.params.id;
  var book = books.find({ id: id }).value();
  return res.render("books/view", { book ,user});
};
const deleteBook=function(req, res) {
  var id = req.params.id;
  books
    .remove({ id: id })
    .write();
  return res.redirect("/book");
};
const editBook=function(req,res){
  var id=req.params.id;
  books
  .find({ id:id})
  .assign({ title: req.body.title})
  .write();
  return res.redirect("/book");
};
module.exports={
  getBook,
  getSearch,
  getCreate,
  postCreate,
  viewDetailBook,
  deleteBook,
  editBook
}