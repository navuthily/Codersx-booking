const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
id: String,
email: String,
name: String,
avatar:String,
password:String
});
var Admin =mongoose.model('Admin', adminSchema, 'admins');
module.exports =Admin;