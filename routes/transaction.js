
const express = require("express");
const router = express.Router();
const shortid = require("shortid");
// Set some defaults

 // for parsing routerlication/x-www-form-urlencoded
const {
getTransaction,
getCreateTransaction,
postCreateTransaction,
finish
}=require('../controllers/transaction.controller')
const {transactComplete}=require('../middleware/transaction.middleware')
const {isAdmin,isNotAdmin}=require('../middleware/isAdmin.middleware')

router.get("/",getTransaction );
router.get("/create",isAdmin,getCreateTransaction );
router.post("/create", isAdmin,postCreateTransaction);
router.get('/:id/finish',transactComplete,finish)
module.exports = router;
