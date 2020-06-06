const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const sessionSchema = new Schema({
  id: String,
  cart: [{
    bookId: {
      type: String,
      ref: "Book"
    },
    quantity: Number
  }]
});
var Session = mongoose.model('Session', sessionSchema, 'sessions');
module.exports = Session;