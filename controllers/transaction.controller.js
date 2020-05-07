const shortid = require("shortid");
const Transaction = require('../models/sessions.model')

var Book = require('../models/book.model')
var User = require('../models/user.model')
var getTransaction = (req, res) => {
  let books = Book.find();
  let users = User.find();
  let transactions = Transaction.find();
  let changeTrans = transactions.map(trans => {
    let book = books.find(book => book.id === trans.bookId);
    let user = users.find(user => user.id === trans.userId);
    return {
      bookTitle: book.title,
      userName: user.username,
      isComplete: trans.isComplete,
      id: trans.id,

    };
  });

  res.render("transactions/index", {
    transactions: changeTrans,
    books,
    users,
  });
};

var getCreateTransaction = (req, res) => {
 let books= Book.find();
 let users =User.find();
  res.render("transactions/create", {
    books,
    users,
    //  status:transactions
  });
};
const postCreateTransaction = (req, res) => {
  
  req.body.id = shortid.generate();
  Transaction
    .create({
      id:req.body.id,
      userId: req.body.userId,
      bookId: req.body.bookId,
      isComplete: false
    });
  res.redirect("/transaction");
};
const finish = function (req, res) {
  var id = req.params.id;
  var transaction = Transaction.find({
    id: id
  });
  return res.render("transactions/finish", );

};
module.exports = {
  getTransaction,
  getCreateTransaction,
  postCreateTransaction,
  finish
};