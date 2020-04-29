var db = require('../db')
module.exports.addToCart = function (req, res, next) {
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if (!sessionId) {
    res.redirect('/products');
    return;
  }
  var count =
  db.get('sessions')
    .find({
     id: sessionId
    })
    .get('cart.' + bookId,0)
    .value();
  db.get('sessions')
    .find({
     id: sessionId
    })
    .set('cart.' + bookId,count + 1)
    .write();
    res.redirect('/book')
}