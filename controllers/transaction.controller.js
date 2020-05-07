const shortid = require("shortid");
const Transaction = require("../models/sessions.model");

var Book = require("../models/book.model");
var User = require("../models/user.model");
// var getTransaction = (req, res) => {

//   var userMain = User.findOne({
//     id: req.signedCookies.userId,
//   });

//   let changeTrans = Transaction.find().map((trans) => {
//     User.finOne({
//       id: trans.userId
//     }).then(function (user) {
//       Book.findOne({
//         id: trans.userId
//       }).then(function (book) {
        
//         return (
//           res.render("transactions/index", {
//             transactions: changeTrans,
//             user: userMain,
//             bookTitle: book.title,
//             userName: user.username,
//             isComplete: trans.isComplete,
//             id: trans.id,
//           })

//         )
//       })
//     })

//   });
//   if( changeTrans ==undefined){
//    res.redirect('/home');
//   }


// };

var getCreateTransaction = (req, res) => {
  let books = Book;
  let users = User;
  res.render("transactions/create", {
    books,
    users,
    //  status:transactions
  });
};
const postCreateTransaction = (req, res) => {
  req.body.id = shortid.generate();
  Transaction.create({
    id: req.body.id,
    userId: req.body.userId,
    bookId: req.body.bookId,
    isComplete: false,
  });
  res.redirect("/transaction");
};
const finish = function (req, res) {
  var id = req.params.id;
  var transaction = Transaction.find({
    id: id,
  });
  return res.render("transactions/finish");
};
module.exports = {
  getTransaction,
  getCreateTransaction,
  postCreateTransaction,
  finish,
};