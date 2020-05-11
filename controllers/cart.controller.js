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
