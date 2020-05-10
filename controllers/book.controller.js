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
const Session = require('../models/sessions.model')

const getBook = function (req, res) {

  User.findOne({  id: req.signedCookies.userId}).then(function (user) {
    
  Book.find().then(function (books) {
    res.render("books/index", {
     books, user
    });
  })
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
  var user = User.find({
    id: req.signedCookies.userId
  });
  res.render("books/create", {
    user
  });
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
  User.findOne({  id: req.signedCookies.userId}).then(function (user) {
    Book.findOne({id: req.params.id}).then(function (book) {
      res.render("books/view", {
        book: book,
        user: user
      });
    })
    })
};
const editBook = async function (req, res) {
  const file = req.file.path;
  console.log(file);
  const path = await cloudinary.uploader
    .upload(file)
    .then(result => result.url)
    .catch(error => console.log("erro:::>", error));
   Book.findOneAndUpdate({
      id: req.params.id
    }, {
      title: req.body.title,
      description: req.body.description,
      cover: path,
      price: req.body.price
    },
    function (err, updatedCampground) {
      if (err) {
        res.redirect("/book");
      } else {
        res.redirect("/book");
      }
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    });
};
var deleteBook = async function (req, res) {
  console.log(req.params.id+'xdcfvgbhnjkm')
  await Book.findOneAndRemove({id:req.params.id})
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