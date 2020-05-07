var Book = require('../models/book.model')
var User = require('../models/user.model')
var Session = require('../models/sessions.model')
module.exports.addToCart = function (req, res, next) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  var count =
    Session
    .find({
      id: sessionId
    })
    .get('cart.' + bookId, 0);

  Session
    .find({
      id: sessionId
    })
    .set('cart.' + bookId, count + 1);
  res.redirect('/book')
}