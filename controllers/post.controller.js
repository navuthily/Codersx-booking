const fs = require("fs");
const shortid = require("shortid");
var cloudinary = require('cloudinary').v2
require('dotenv').config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var Post = require('../models/post.model')
var User = require('../models/user.model')

const getPost = function (req, res) {

  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {

    Post.find().then(function (posts) {
      res.render("posts/index", {
        posts,
        user
      });

    })
  })
}

const getCreate = function (req, res) {
  var user = User.find({
    id: req.signedCookies.userId
  });
  res.render("posts/create", {
    user
  });
};
const postCreate = async function (req, res) {
  req.body.id = shortid.generate();
  const file = req.file.path;
  console.log(file);
  const path = await cloudinary.uploader
    .upload(file)
    .then(result => result.url)
    .catch(error => console.log("erro:::>", error));
  Post.create({
    id: req.body.id,
    contentPost: req.body.contentPost,
    imagePost: path,
  });
  if (req.file) {
    fs.unlinkSync(req.file.path);
  }

  return res.redirect("/post");
};
const viewDetailPost = function (req, res) {
  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    Post.findOne({
      id: req.params.id
    }).then(function (post) {
      res.render("post/view", {
        post: post,
        user: user
      });
    })
  })
};
const postComment = async function (req, res) {
  let commentByUserId = req.signedCookies.userId;
  let postId = req.params.postId;
  console.log(postId);
  console.log(postId + 'postid');
  if (!postId) {
    res.redirect("/post");
  }
  let post = await Post.findOne({
    id: postId
  });
  let user = post.comments.find(
    cartItem => cartItem.commentByUserId === commentByUserId
  );
  if (user) {
    user.contentComment = req.body.contentComment;
    console.log(user.contentComment)
    post.save();
  } else {
    await Post.findOneAndUpdate({
      id: postId
    }, {
      $push: {
        comments: {
          commentByUserId,
          contentComment
        }
      }
    });
    return res.redirect("/post");
  }
}
const getComment =function (req,res){
  // return res.send("fcvgbhj");
  return res.redirect("/post");
}
module.exports = {
  getPost,
  getCreate,
  postCreate,
  getComment,
  postComment

}