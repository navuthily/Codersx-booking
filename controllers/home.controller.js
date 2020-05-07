var User = require('../models/user.model');
 // for parsing routerlication/x-www-form-urlencoded
const getHome= function(req, res) {
  var user=User.find({id:req.signedCookies.userId});
  res.render("home",{user:user});
};
module.exports={
getHome
}