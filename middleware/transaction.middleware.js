const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({
  transactions: []
}).write();
var transactions = db.get("transactions").value();
var transactComplete= (req, res, next) => {
  if (transactions.find(element => element.id==req.params.id)) {
    return next();
  }
  return res.redirect('/home');
};
module.exports={
  transactComplete
}