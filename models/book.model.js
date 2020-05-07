const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  cover:String,
  price: String,
});
var Book = mongoose.model('Book', bookSchema, 'books');
module.exports = Book;