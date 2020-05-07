const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  username: String,
  avatar: String,
  password: String,
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;