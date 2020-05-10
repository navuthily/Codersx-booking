const fs = require("fs");
var cloudinary = require('cloudinary').v2
const shortid = require("shortid");
const saltRounds = 10;
const bcrypt = require('bcrypt');
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
var User = require('../models/user.model')
const getUser = function (req, res) {
  User.find().then(function (users) {
    User.findOne({ id: req.signedCookies.userId}).then(function (user) {
      res.render("users/index", {
        users,user
      });
      })
  })
}
// res.render("users/index", {
//   users
// });
const getSearch = function (req, res) {
  var user = User.find({
    id: req.signedCookies.userId
  });
  var noMatch = null;
  if (req.query.search) {
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    // Get all users from DB
    User.find({
      username: regex
    }, function (err, allUsers) {
      if (err) {
        console.log(err);
      } else {
        if (allUsers.length < 1) {
          noMatch = "No users match that query, please try again.";
        }
        res.render("users/index", {
          users: allUsers,
          noMatch: noMatch
        });
      }
    });
  } else {
    // Get all users from DB
    User.find({}, function (err, allUsers) {
      if (err) {
        console.log(err);
      } else {
        res.render("users/index", {
          users: allUsers,
          noMatch: noMatch,
          user
        });
      }
    });
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
const getCreate = function (req, res) {

  res.render("users/create");
};

const postCreate =  function (req, res) {
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
      User
        .create({
          id: req.body.id,
          username: req.body.username,
          email: req.body.email,
          password: hashPassword,
          avatar: 'default.jpg'
        })
      return res.redirect("/user");
    });
  }

};

const viewDetailUser = function (req, res) {
  var id = req.params.id;
  var user = User.find({
    id: id
  });
  return res.render("users/view", {
    user
  });
};

const editUser = async function (req, res) {
  var id = req.params.id;
  const file = req.file.path;
  console.log(file);
  const path = await cloudinary.uploader
    .upload(file)
    .then(result => result.url)
    .catch(error => console.log("erro:::>", error));
  User.updateOne(id, {
      username: req.body.username,
      avatar: path,
    },
    function (err, updatedCampground) {
      if (err) {
        res.redirect("/user");
      } else {
        //redirect somewhere(show page)
        res.redirect("/user");
      }
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
    });
};

var deleteUser = function (req, res) {
  var id = req.params.id;
  User.deleteOne({
    id
  }, function (err) {
    if (err) {
      console.log(err);
    }
  });
  res.redirect('/user');
};
module.exports = {
  getUser,
  getSearch,
  getCreate,
  postCreate,
  viewDetailUser,
  deleteUser,
  editUser
}