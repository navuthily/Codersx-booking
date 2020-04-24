const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ users: []}).write();
 // for parsing routerlication/x-www-form-urlencoded

const shortid = require("shortid");
var users = db.get("users");
const getUser=function(req, res) {

  res.render("users/index", { users: users.value()});

};
const getSearch=function(req, res) {
  var q = req.query.q;
  var matched = users.value().filter(function(user) {
    return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });
  res.render("users/index", { users: matched });
};
const getCreate= function(req, res) {
  res.render("users/create");
};
const postCreate= function(req, res) {
  req.body.id = shortid.generate();
  var errors=[];
  if(!req.body.name){
    errors.push('Name is required!')
  }
  if(req.body.name.length>5){
    errors.push('Tên không hợp lệ.')
  }
  if(errors.length){
   return  res.render("users/create",{errors:errors,
    values:req.body
    });
  }

  else{
  users.push(req.body).write();
  return res.redirect("/user");
}
};
const viewDetailUser= function(req, res) {
  var id = req.params.id;
  var user = users.find({ id: id }).value();
  return res.render("users/view", { user });
};
const deleteUser= function(req, res) {
  var id = req.params.id;
  users
    .remove({ id: id })
    .write();
  return res.redirect("/user");
};
const editUser=function(req,res){
  var id=req.params.id;
  users
  .find({ id:id})
  .assign({ name: req.body.name})
  .write();
  return res.redirect("/user");
};

module.exports={
  getUser,
  getSearch,
  getCreate,
  postCreate,
  viewDetailUser,
  deleteUser,
  editUser
}