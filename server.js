// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(express.static('public'));
app.use(express.static('files'));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true})) // for parsing application/x-www-form-urlencoded
app.set('view engine', 'pug');
app.set('views', './views/');
var todos=[
  {id:1,work:'nau an'},
  {id:2,work:'an sang'},
  {id:3,work:'hoc code o Codersx'},
]
// https://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.send('I love CodersX');
});
app.get('/todos', function (req, res) {
  res.render('index', {todos:todos})
})
app.get('/search', function (req, res) {
  var q= req.query.q;
  var matched= todos.filter(function(todo){
  return todo.work.toLowerCase().indexOf(q.toLowerCase())!==-1;
  })
  res.render('index', {todos:matched})
})
app.get('/create', function (req, res) {
 
   res.render('create')
})
app.post('/create', function (req, res) {
   todos.push(req.body);
 return res.redirect('/todos');
})

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
