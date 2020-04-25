// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const port=3000;
const cookieParser = require('cookie-parser')
var routerUser=require('./routes/users')
var routerBook=require('./routes/books')
var routerTransaction=require('./routes/transaction')
var routerAuth=require('./routes/auth')
const bodyParser = require("body-parser")
const {userAuth,userIsNotAuth}=require('./middleware/auth.middleware')
app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser())
app.set("view engine", "pug");
app.set("views", "./views/");
const methodOverride = require("method-override");

app.use(
  methodOverride(req => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
const {countCookieRequest}=require('./middleware/cookies.middleware')
app.get("/",countCookieRequest,(req, res,next) => {
  res.cookie('user-id', 12345)
  res.render("index.pug");
});
app.use('/',countCookieRequest,routerAuth)
app.use('/user',userAuth,countCookieRequest, routerUser)
app.use('/book',userAuth,countCookieRequest,routerBook)
app.use('/transaction',userAuth,countCookieRequest, routerTransaction)
app.get('/home',userAuth,countCookieRequest, function (req,res) {
  res.render('home');
  })
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
