const fs = require("fs");
const shortid = require("shortid");
var cloudinary = require('cloudinary').v2
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var Book = require('../models/book.model')
var User = require('../models/user.model')
const getBook = function (req, res) {
  Book.find().then(function (books) {
    res.render("books/index", {
      books
    });
  })
}

var create = async function (req, res) {
  var book = await Book.create(req.body);
  res.json(book);
}


const getSearch = function (req, res) {
  var noMatch = null;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get all books from DB
    Book.find({
      title: regex
    }, function (err, allBooks) {
      if (err) {
        console.log(err);
      } else {
        if (allBooks.length < 1) {
          noMatch = "No Books match that query, please try again.";
        }
        res.render("books/index", {
          books: allBooks,
          noMatch: noMatch
        });
      }
    });
  } else {
    // Get all books from DB
    Book.find({}, function (err, allBooks) {
      if (err) {
        console.log(err);
      } else {
        res.render("books/index", {
          books: allBooks,
          noMatch: noMatch
        });
      }
    });
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
const getCreate = function (req, res) {

  res.render("books/create");
};

const postCreate = async function (req, res) {
  req.body.id = shortid.generate();
  const file = req.file.path;
  console.log(file);
  const path = await cloudinary.uploader
    .upload(file)
    .then(result => result.url)
    .catch(error => console.log("erro:::>", error));

  Book.create({
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    cover: path,
    price: req.body.price
  });
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }
  console.log(typeof (req.body.price));
  return res.redirect("/book");
};
const viewDetailBook = function (req, res) {
  var id = req.params.id;
  var book = Book.find({
    id: id
  });
  return res.render("books/view", {
    book
  });
};

const editBook = async function (req, res) {
  var id = req.params.id;
  const file = req.file.path;
  console.log(file);
  const path = await cloudinary.uploader
    .upload(file)
    .then(result => result.url)
    .catch(error => console.log("erro:::>", error));
  Book.updateOne(id,
    {
      title: req.body.title,
      description: req.body.description,
      cover: path,
      price: req.body.price
    }
     ,
    function (err, updatedCampground) {
      if (err) {
        res.redirect("/book");
      } else {
        //redirect somewhere(show page)
        res.redirect("/book");
      }
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    });
};

var deleteBook = function (req, res) {
  var id= req.params.id;
  Book.deleteOne({id}, function (err) {
    if (err){
      console.log(err);
    }
  });
  res.redirect('/book');
};
module.exports = {
  getBook,
  create,
  getSearch,
  getCreate,
  postCreate,
  viewDetailBook,
  deleteBook,
  editBook
}