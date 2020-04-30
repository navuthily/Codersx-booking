const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String
});
var Book = mongoose.model('Book', bookSchema, 'books');
module.exports = Book;