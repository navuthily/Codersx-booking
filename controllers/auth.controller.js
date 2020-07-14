
var User = require("../models/user.model");
var jwt = require("jsonwebtoken");
const saltRounds = 10;
const bcrypt = require("bcrypt");
var countWrongPassword = 0;
const shortid = require("shortid");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const getRegister = function (req, res) {
  res.render("users/register");
};
const postRegister = function (req, res) {
  req.body.id = shortid.generate();

  bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
    User.create({
      id: req.body.id,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      wrongLoginCount: countWrongPassword,
      avatar: "default.jpg",
    });
  });
  console.log(req.body.password);
};

const getLogin = function (req, res) {
  res.render("auth/login");
};
const postLogin = async function (req, res) {
  var user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }
  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      var privateKey = process.env.PRIVATE_KEY;
      const k = {
        email: req.body.email,
        password: req.body.password,
      };
      return jwt.sign({ user: k }, privateKey, { expiresIn: "30s" }, function (
        err,
        token
      ) {
        res.json({ token, user });
      });
    }
    if (err) {
      console.log(err + " : lloi ne");
    }
    if (user.password !== req.body.password) {
      errors.push("wrong password.");
      countWrongPassword += 1;
      console.log(countWrongPassword);
      if (countWrongPassword > 1) {
        console.log(req.body.email);
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        sgMail
          .send({
            to: `${req.body.email}`,
            from: "vuthilyna304@gmail.com",
            subject: "Wrong password",
            text:
              "You submit wrong password a lot of times. Please restart try again next time ",
            html:
              '<strong>You submit wrong password a lot of times. Please restart try again next time. If you forget password let click this link to change : <a href="#">change password</a></strong>',
          })
          .then(() => {
            console.log("email sent");
          })
          .catch((error) => {
            console.error("Canot send email", error);
          });

        return res.redirect("/notification");
      }
    }
    if (errors.length) {
      return res.render("auth/login", {
        errors: errors,
        values: req.body,
      });
    }
  });
};
module.exports = {
  getLogin,
  postLogin,
  getRegister,
  postRegister,
};
