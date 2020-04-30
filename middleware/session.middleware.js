const shortid = require("shortid");
var db = require('../db')
module.exports = function (req, res, next) {
  if (req.signedCookies.sessionId == undefined) {
    var sessionId = shortid.generate();
    res.cookie('sessionId', sessionId, {
      signed: true //sign cookies ddeer baor maatj hown
    })
    db.get('sessions').push({
      id: sessionId
    }).write();

  }
  var sessions = db.get("sessions").value();
  console.log(sessions[sessions.length - 1])

  var a = sessions[sessions.length - 1];
  console.log(a.cart)
  var q=a.cart;
  console.log(Object.values(q));
      var y= Object.values(q);
      var sum =0;
      for(let i=0;i<y.length;i++){
        sum+=y[i];
      }
     
      
  next();
}