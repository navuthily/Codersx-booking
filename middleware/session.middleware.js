const shortid = require("shortid");
var Session = require('../models/sessions.model')
// module.exports = function (req, res, next) {
//   if (req.signedCookies.sessionId == undefined) {
//     var sessionId = shortid.generate();
//     res.cookie('sessionId', sessionId, {
//       signed: true 
//     })
//     Session.create({
//       id: sessionId
//     });
 
//   }
//   var sessions =Session.find();
//   console.log(sessions[sessions.length - 1])
//   if(sessions.cart){
//   var a = sessions[sessions.length - 1];
//   console.log(a.cart)
//   var q=a.cart;
//   console.log(Object.values(q));
//       var y= Object.values(q);
//       var sum =0;
//       for(let i=0;i<y.length;i++){
//         sum+=y[i];
//       }
//       console.log(sum+'navu de thuong sum');
//   }
//   else{
//     sum =0;
//   }
      
//   next();
// }

module.exports = async (req, res, next) => {
 

   if (req.signedCookies.sessionId == undefined) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true 
    })
    Session.create({
      id: sessionId
    });
 
  }

  let session = await Session.findOne({id:req.signedCookies.sessionId});

  let count = 0;

  if (session) {
    for (let book of session.cart) {
      count += book.quantity;
    }
  }

  res.locals.count = count;

  next();
};
