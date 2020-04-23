
const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);
// Set some defaults
db.defaults({ transactions: []}).write();
 // for parsing routerlication/x-www-form-urlencoded
const{
getTransaction,
postTransaction,
finish
}=require('../controllers/transaction.controller')
router.get("/",getTransaction );

router.post("/", postTransaction);
router.get('/:id/finish',finish)
module.exports = router;
