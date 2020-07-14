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
const getPost = async function (req, res) {
  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    Post.find().then(async function (posts) {

    // console.log(a); 
    //   console.log(counts+"counts");
      res.render("posts/index", {
        posts,
        user
      });
  //    res.json({posts, user })

    })
  })
}
const getApiPost = async function (req, res) {
  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    Post.find().then(async function (posts) {

    // console.log(a); 
    //   console.log(counts+"counts");
 
      res.json(posts)

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
    id: 'cfvgbhjn',//req.body.id,
    authorid:  "leSPD0q8u",//req.signedCookies.userId,
    contentPost: req.body.contentPost,
    imagePost: 'dfghj'//path,
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
  let contentComment= req.body.contentComment;
  console.log(contentComment+"<<= content comment")
  let commentByUserId = req.signedCookies.userId;
  let postId = req.params.postId;
  if (!postId) {
    res.redirect("/post");
  }
  let post = await Post.findOne({
    id: postId
  });
    await Post.findOneAndUpdate({
      id: postId
    }, {
      $push: {
        comments: {
          commentByUserId,
          contentComment: req.body.contentComment
        }
      }
    });
    return res.redirect("/post");
}
const getComment =function (req,res){
  return res.redirect("/post");
}
var getApi = async (req, res) => {
  let users = await User.find();
  let posts = await Post.find();
  let changePost = posts.map(post => {
    let user = users.find(user => user.id === post.authorid);
    var hearts= post.hearts;
    var c = hearts.map(heart => {
      let u = users.find(us => us.id === heart.heartByUserId)
      return{
     heartByUser:u.username,
     quantity:heart.quantity
      }
    });





    var comments = post.comments;
    var d = comments.map(comment =>{
      let uus=users.find(uus =>uus.id === comment.commentByUserId)
      return{
        commentByUser:uus.username,
        contentComment:comment.contentComment
      }
    })

    return {
    
      id: post.id,
      userName: user.username,
      contentPost: post.contentPost,
      imagePost: post.imagePost,
      hearts:c,
      comments:d
    };
  });
  User.findOne({
    id: req.signedCookies.userId
  }).then(function (user) {
    Post.find().then(function (posts) {
      User.find().then(function (users) {
//console.log(changePost);
         res.json({
        changePost//t muốn cái khác cơ
        })
      })
    })

  })

};
module.exports = {
  getPost,
  getCreate,
  postCreate,
  getComment,
  postComment,
  getApiPost,
  getApi
}