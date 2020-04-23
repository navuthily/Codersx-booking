// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const port=4000;
var routerUser=require('./routes/users')
var routerBook=require('./routes/books')
var routerTransaction=require('./routes/transaction')
const bodyParser = require("body-parser")
app.use(express.static("public"));
app.use(express.static("files"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
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
app.use('/user', routerUser)
app.use('/book',routerBook)
app.use('/transaction', routerTransaction)
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
