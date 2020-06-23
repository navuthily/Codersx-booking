const shortid = require("shortid");
var Post = require('../models/post.model')

module.exports = async (req, res, next) => {
 

//   if (req.signedCookies.postId == undefined) {
//    var postId = shortid.generate();
//    res.cookie('postId', postId, {
//      signed: true 
//    })
//    Post.create({
//      id: postId
//    });

//  }

//  let post = await Post.findOne({id:req.signedCookies.postId});



//  res.locals.counts = counts;

 next();
};