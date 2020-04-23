var express = require('express')
var router = express.Router()
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
var users = db.get("users");


router.get("/", function(req, res) {

  res.render("users/index", { users: users.value()});

});
router.get("/search", function(req, res) {
  var q = req.query.q;
  var matched = users.value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", { users: matched });
});
router.get("/create", function(req, res) {
  res.render("users/create");
});
router.post("/create", function(req, res) {
  req.body.id = shortid.generate();

  users.push(req.body).write();
  return res.redirect("/user");
});
router.get("/view/:id", function(req, res) {
  var id = req.params.id;
  var user = users.find({ id: id }).value();
  return res.render("users/view", { user });
});
router.delete("/delete/:id", function(req, res) {
  var id = req.params.id;
  users
    .remove({ id: id })
    .write();
  return res.redirect("/user");
});
router.put('/edit/:id', function(req,res){
  var id=req.params.id;
  users
  .find({ id:id})
  .assign({ name: req.body.name})
  .write();
  return res.redirect("/user");
})


module.exports = router;