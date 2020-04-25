const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({
  users: []
}).write();
// for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
var users = db.get("users");
const getLogin = function (req, res) {
 res.render('auth/login');
}
const postLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = users.find({
    email: email
  }).value();
  if (!user) {
    res.render('auth/login', {
      errors: [
        'user does not exist.'
      ],
      values: req.body
    });
    return;
  }
  if (user.password !== password) {
    res.render('auth/login', {
      errors: [
        'wrong password.'
      ],
      values: req.body
    });
    return;
  }
  res.cookie('userId', user.id);
  res.redirect('/home');
}
module.exports = {
getLogin,
postLogin
}