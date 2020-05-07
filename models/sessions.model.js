const mongoose = require('mongoose');
const sessionSchema = new mongoose.Schema({
id: String
});
var Session =mongoose.model('Session', sessionSchema, 'sessions');
module.exports =Session;