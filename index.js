
const express = require("express");
var cors = require('cors')
const app = express();
const port= process.env.PORT ||5000;
require('dotenv').config();
const mongoose = require('mongoose');
mongoose
.connect(process.env.MONGO_URI, {
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false
})
.then(() => console.log('DB Connected!'))
.catch(err => {
console.log(`DB Connection Error: ${err.message}`);
});
const cookieParser = require('cookie-parser')
var routerCart = require('./routes/cart.route')
var routerHeart = require('./routes/heart.route')
var routerUser=require('./routes/users')
var routerBook=require('./routes/books')
var routerPost=require('./routes/post')
var routerTransaction=require('./routes/transaction')
var routerAuth=require('./routes/auth')
var routerHome=require('./routes/home')
const bodyParser = require("body-parser")
const {userAuth,userIsNotAuth}=require('./middleware/auth.middleware')
app.use(cors())
app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cookieParser(process.env.SESSION_SECRET))
var sessionMiddleware =require('./middleware/session.middleware')
var postingMiddleware = require('./middleware/posting.middleware')
app.use(sessionMiddleware);
app.use(postingMiddleware);
app.set("view engine", "pug");
app.set("views", "./views/");
const methodOverride = require("method-override");
app.use(
  methodOverride(req => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);
const {countCookieRequest}=require('./middleware/cookies.middleware')
console.log({countCookieRequest})
app.get("/",countCookieRequest,(req, res,next) => {
  res.cookie('user-id', 12345)
  res.render("index.pug");
});
app.get('/notification', (req,res)=>{
  res.render('notification', {title:'You submitted wrong password a lot of time. Please restart try again next time '});
})
app.use('/',countCookieRequest,routerAuth)
app.use('/cart',routerCart)
app.use('/hearts',routerHeart)
app.use('/user',userAuth,countCookieRequest, routerUser)
app.use('/book',countCookieRequest,routerBook)
app.use('/post',countCookieRequest,routerPost)
app.use('/transaction',countCookieRequest,userAuth, routerTransaction)
app.use('/home',countCookieRequest,routerAuth,routerHome)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});


