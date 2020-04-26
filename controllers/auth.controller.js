const low = require("lowdb");
const saltRounds = 10;
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const bcrypt = require('bcrypt');
var countWrongPassword=0;
// Set some defaults
db.defaults({
  users: []
}).write();
// for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
var users = db.get("users");
const getRegister = function (req, res) {
  res.render("users/register");
};
const postRegister = function (req, res) {
  req.body.id = shortid.generate();
  var errors = [];
  if (!req.body.username) {
    errors.push('Name is required!')
  }
  if (req.body.username.length > 10) {
    errors.push('Tên không hợp lệ.')
  }
  if (errors.length) {
    return res.render("users/register", {
      errors: errors,
      values: req.body
    });
  } else {

    bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
      users
        .push({
          id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
          wrongLoginCount: countWrongPassword
        }).write();
      return res.redirect("/login");
    });
  }

};

const getLogin = function (req, res) {
  res.render('auth/login');
}
const postLogin = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var user = users.find({
    email: email
  }).value();
  var errors =[];
  if (!user) {
    errors.push('user does not exist')
  }
 
  if (typeof user !== 'undefined') {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        res.cookie('userId', user.id);
        return res.redirect('/home');
      }
      if (user.password !== password) {
        errors.push('wrong password.')
        countWrongPassword +=1;
        console.log(countWrongPassword);
        if(countWrongPassword>2){
          return res.redirect('/notification')
        }
      }
      if (errors.length) {
        return res.render("auth/login", {
          errors: errors,
          values: req.body
        });
      } 
      return res.redirect('/login');
    });
  }

}
module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister
}