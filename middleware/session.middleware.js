const shortid = require("shortid");
var Session = require('../models/sessions.model')
module.exports = async (req, res, next) => {
   if (req.signedCookies.sessionId == undefined) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true 
    })
    Session.create({
      id: sessionId
    });
 
  }

  let session = await Session.findOne({id:req.signedCookies.sessionId});

  let count = 0;

  if (session) {
    for (let book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.count = count;

  next();
};
