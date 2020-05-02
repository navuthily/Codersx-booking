const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
email: String,
username: String,
avatar:String,
password:String
});
var User =mongoose.model('User', userSchema, 'user');
module.exports =User;