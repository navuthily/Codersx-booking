var User = require('../models/user.model');
var Book  = require('../models/book.model');
var Admin = require('../models/admin.model');
const isAdmin= (req, res, next) => {
  var a=req.signedCookies.userId;
  console.log(a+'cdvfbghn');
  var admin=Admin.find({id:a}).value();
  if(!admin){
   return  res.redirect('/home');
  }
  
  if(admin){
    return next();
  }
  res.redirect('/home')
};


const isNotAdmin = (req, res, next) => {
  if (admin) {
    return next();
  }
  return res.redirect('/home');
};

module.exports = { isAdmin,isNotAdmin };
