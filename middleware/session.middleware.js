// var Session = require('../models/sessions.model')
// const shortid = require("shortid");
// module.exports = function (req, res, next) {

//   if (req.signedCookies.sessionId == undefined) {
//     var sessionId = shortid.generate();
//     console.log(sessionId)
//     res.cookie('sessionId', sessionId, {
//       maxAge: 24 * 3600 * 1000,
//       signed: true
//     })
//     Session.create({
//       id: sessionId
//     });
//   }
//   next();
// }



const shortid = require("shortid");
var Session = require('../models/sessions.model')
module.exports = function (req, res, next) {
  if (req.signedCookies.sessionId == undefined) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true 
    })
    Session.create({
      id: sessionId
    });

  }
  var sessions =Session.find();
  console.log(sessions[sessions.length - 1])
  if(sessions.cart){
  var a = sessions[sessions.length - 1];
  console.log(a.cart)
  var q=a.cart;
  console.log(Object.values(q));
      var y= Object.values(q);
      var sum =0;
      for(let i=0;i<y.length;i++){
        sum+=y[i];
      }
     
  }
  else{
    sum =0;
  }
      
  next();
}