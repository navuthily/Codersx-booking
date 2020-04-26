const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ admins: []}).write();
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded
const shortid = require("shortid");
const isAdmin= (req, res, next) => {
  var a=req.cookies.userId;
  console.log(a);
  var admin=db.get('admins').find({id:a}).value();
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
