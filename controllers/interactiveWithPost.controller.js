const Post= require("../models/post.model.js");
module.exports.addToCartHeart = async (req, res) => {
  let heartByUserId = req.signedCookies.userId;
  let postId = req.params.postId;
 console.log(postId+'postid');
  if (!postId) {
    res.redirect("/post");
  }
  let post = await Post.findOne({id:postId});
  let user = post.hearts.find(
    cartItem => cartItem.heartByUserId === heartByUserId
  );
  if (user) {
    user.quantity += 1;
    console.log(user.quantity)
    post.save();
  } else {
    await Post.findOneAndUpdate({id:postId}, {
      $push: { hearts: { heartByUserId, quantity: 1 } }
    });
  }
  res.redirect("/post");
};
//
// module.exports.addToCartComment = async (req, res) => {
//   let commentByUserId = req.signedCookies.userId;
//   let postId = req.params.postId;
//  console.log(postId+'postid');
//   if (!postId) {
//     res.redirect("/post");
//   }
//   let post = await Post.findOne({id:postId});
//   let user = post.comments.find(
//     cartItem => cartItem.commentByUserId === commentByUserId
//   );
//   if (user) {
//     user.contentComment = req.body.contentComment;
//     console.log(user.contentComment)
//     post.save();
//   } else {
//     await Post.findOneAndUpdate({id:postId}, {
//       $push: { comments: { commentByUserId, contentComment } }
//     });
//   }
  //howacj có thể là đơn giản hơn (req.body)
//   res.redirect("/post");
// };
