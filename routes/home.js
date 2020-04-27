var express = require('express')
var router = express.Router()
const { getHome
} = require('../controllers/home.controller')

router.get('/', getHome)

module.exports = router;