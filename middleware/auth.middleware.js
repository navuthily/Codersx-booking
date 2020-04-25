const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
const userAuth = (req, res, next) => {
  if (!req.cookies.userId) {
   return  res.redirect('/login');
 
  }
  if (req.cookies.userId) {
    return next();
  
   }
  var user=db.get('users').find({id:req.cookies.userId}).value();
  if(!user){
   return  res.redirect('/login');
  }
  res.redirect('/home');
};


const userIsNotAuth = (req, res, next) => {
  if (!req.cookies.userId) {
    return next();
  }
  return res.redirect('/home');
};

module.exports = { userAuth, userIsNotAuth };
