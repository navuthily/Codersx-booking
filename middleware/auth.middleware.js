const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
const userAuth = (req, res, next) => {
  if (!req.signedCookies.userId) {
   return  res.redirect('/login');
 
  }
  if (req.signedCookies.userId) {
    return next();
  
   }
  var user=db.get('users').find({id:req.signedCookies.userId}).value();
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
