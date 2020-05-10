// const shortid = require("shortid");
// require('dotenv').config();
// const Transaction = require("../models/transaction.model");
// var User = require("../models/user.model");
// var Book = require("../models/book.model");
// var Session = require('../models/sessions.model')
// module.exports.addToCart = async function (req, res, next) {
//   var bookId = req.params.bookId;
//   console.log('bookId : => '+bookId);
//   var sessionId = req.signedCookies.sessionId;
//   if (!sessionId) {
//     res.redirect('/home');
//     return;
//   }
//   console.log('sessionid  : => '+sessionId);
//   // var quantity =
//   //   await Session
//   //   .findOne({
//   //     id: sessionId
//   //   })
//   //   .get('cart.' + bookId, 0);
//   // console.log( 'quantity : => '+quantity);
//   //  Session
//   //   .findOne({
//   //     id: sessionId
//   //   })
//   //   $push('cart.' + bookId, quantity + 1);


//   var quantity =
//   1;
// console.log( 'quantity : => '+quantity);
//  Session
//   .findOne({
//     id: sessionId
//   })
//   .set('cart.' + bookId, quantity + 1);
//   res.redirect('/book')
// }






const Session = require("../models/sessions.model.js");

module.exports.addToCart = async (req, res) => {
  let bookId = req.params.bookId;
  let sessionId = req.signedCookies.sessionId;
 console.log(sessionId+'sessionid');
  if (!sessionId) {
    res.redirect("/book");
  }

  let session = await Session.findOne({id:sessionId});

  let book = session.cart.find(
    cartItem => cartItem.bookId === bookId
  );

  if (book) {
    book.quantity += 1;
    session.save();
  } else {
    await Session.findOneAndUpdate({id:sessionId}, {
      $push: { cart: { bookId, quantity: 1 } }
    });
  }

  res.redirect("/book");
};
