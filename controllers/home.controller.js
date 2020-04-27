const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded
const shortid = require("shortid");
const getHome= function(req, res) {
  var user=db.get('users').find({id:req.signedCookies.userId}).value();
  res.render("home",{user:user});
};


module.exports={
getHome
}