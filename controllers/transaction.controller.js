const shortid = require("shortid");
require('dotenv').config();
const Transaction = require("../models/transaction.model");
var Book = require("../models/book.model");
var User = require("../models/user.model");

console.log(typeof (Book.find()) + 'vbhnjkgfvcxweewsx');
var getTransaction = async (req, res) => {
  let users = await User.find();
  let transactions = await Transaction.find();
  let books = await Book.find();
  let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    
 
    return {
      bookTitle: book.title,
      userName: user.username,
      isComplete: trans.isComplete,
      id: trans.id,
      bookId :book.id


    };
  });

  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    Transaction.find().then(function (transactions) {
      User.find().then(function (users) {
        Book.find().then(function (books) {
          res.render("transactions/index", {
            transactions: changeTrans,
            books: books,
            users: users,
            user: user,

          });
        })
      })
    })

  })

};


var getCreateTransaction = async (req, res) => {
  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    User.find().then(function (users) {
      Book.find().then(function (books) {
        res.render("transactions/create", {
          books: books,
          users: users,
          user: user,

        });
      })
    })
  })
}
const postCreateTransaction = async (req, res) => {
  console.log(req.body.bookId + 'dcfgvhbjk');
  console.log(req.body.userId + 'dcfgvhbjkfghjkl');
  await Transaction.create({
    id: shortid.generate(),
    userId: req.body.userId,
    bookId: req.body.bookId,
    isComplete: false,
  })
  res.redirect("/transaction");
}
const finish = function (req, res) {
  var id = req.params.id;
  var transaction = Transaction.find({
    id: id,
  });
  return res.render("transactions/finish");
};

const giveBookBack= async function (req,res){
 await Transaction.findOneAndUpdate({
    //id: req.params.id sia rồi cái pấm này của book
    bookId:req.params.id
  }, {
   isComplete: true
  },
  function (err, updatedCampground) {
    if (err) {
      res.redirect("/home");
    } else {
      res.redirect("/transaction");
    }
  });
}
module.exports = {
  getTransaction,
  getCreateTransaction,
  postCreateTransaction,
  finish,
  giveBookBack
};