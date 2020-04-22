// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ books: []}).write();

app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.set("view engine", "pug");
app.set("views", "./views/");
// var todos=[
//   {id:1,work:'nau an'},
//   {id:2,work:'an sang'},
//   {id:3,work:'hoc code o Codersx'},
// ]
// https://expressjs.com/en/starter/basic-routing.html

const methodOverride = require("method-override");
const shortid = require("shortid");
var books = db.get("books");
app.use(
  methodOverride(req => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
app.get("/", (request, response) => {
  response.send("I love CodersX");
});
app.get("/books", function(req, res) {
  res.render("index", { books: books.value() });
});
app.get("/search", function(req, res) {
  var q = req.query.q;
  var matched = books.value().filter(function(book) {
    return book.work.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("index", { books: matched });
});
app.get("/create", function(req, res) {
  res.render("create");
});
app.post("/create", function(req, res) {
  req.body.id = shortid.generate();

  books.push(req.body).write();
  return res.redirect("/books");
});
app.get("/view/:id", function(req, res) {
  var id = req.params.id;
  var book = books.find({ id: id }).value();
  return res.render("view", { book });
});
app.delete("/delete/:id", function(req, res) {
  var id = req.params.id;
  books
    .remove({ id: id })
    .write();
  return res.redirect("/books");
});
app.put('/edit/:id', function(req,res){
  var id=req.params.id;
  books
  .find({ id:id})
  .assign({ title: req.body})
  .write();
  return res.redirect("/books");
})
// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
