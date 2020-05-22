const shortid = require("shortid");

// Set some defaults
const Transaction =require('../models/transaction.model')


var transactComplete= (req, res, next) => {
  if (Transaction.findOne({id:req.params.id})) {
    return next();
  }
  return res.redirect('/home');
};
module.exports={
  transactComplete
}