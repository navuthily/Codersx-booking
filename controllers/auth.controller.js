const low = require("lowdb");
const saltRounds = 10;
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
const bcrypt = require('bcrypt');
var countWrongPassword = 0;
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
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
          wrongLoginCount: countWrongPassword,
          avatar: 'default.jpg'
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
  var errors = [];
  if (!user) {
    errors.push('user does not exist')
  }

  if (typeof user !== 'undefined') {
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (result) {
        res.cookie('userId', user.id, {
          signed: true
        });
        return res.redirect('/home');
      }
      if (user.password !== password) {
        errors.push('wrong password.')
        countWrongPassword += 1;
        console.log(countWrongPassword);
        if (countWrongPassword > 1) {
        
         sgMail.setApiKey(process.env.SENDGRID_API_KEY);
         sgMail.send({
            to: 'vuthilyna21@gmail.com',
            from: 'vuthilyna304@gmail.com',
            subject:  'Wrong password',
            text: 'You submit wrong password a lot of times. Please restart try again next time ',
            html: '<strong>You submit wrong password a lot of times. Please restart try again next time. If you forget password let click this link to change : <a href="#">change password</a></strong>',
          })
          .then(() => {
            console.log("email sent");
          })
          .catch((error) => {
            console.error('Canot send email', error);
          });
         
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