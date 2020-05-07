var User = require('../models/user.model');
const userAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
   return  res.redirect('/login');
  }
  if (req.signedCookies.userId) {
    return next();
   }
  var user=User.find({id:req.signedCookies.userId});
  if(!user){
   return  res.redirect('/login');
  }
  res.redirect('/home');
};
const userIsNotAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
    return next();
  }
  return res.redirect('/home');
};
module.exports = { userAuth, userIsNotAuth };
