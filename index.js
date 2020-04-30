
const express = require("express");
const app = express();
const port=4000;
require('dotenv').config();
const cookieParser = require('cookie-parser')
var routerCart = require('./routes/cart.route')
var routerUser=require('./routes/users')
var routerBook=require('./routes/books')
var routerTransaction=require('./routes/transaction')
var routerAuth=require('./routes/auth')
var routerHome=require('./routes/home')
const bodyParser = require("body-parser")
const {userAuth,userIsNotAuth}=require('./middleware/auth.middleware')
app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser(process.env.SESSION_SECRET))
var sessionMiddleware =require('./middleware/session.middleware')
app.use(sessionMiddleware);
app.use('/cart',routerCart)

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
 
  res.render("index.pug");
});
app.get('/notification', (req,res)=>{
  res.render('notification', {title:'You submitted wrong password a lot of time. Please restart try again next time '});
})
app.use('/',countCookieRequest,routerAuth)
app.use('/user',userAuth,countCookieRequest, routerUser)
app.use('/book',countCookieRequest,routerBook)
app.use('/transaction',userAuth,countCookieRequest, routerTransaction)
app.use('/home',countCookieRequest,routerAuth,routerHome)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
