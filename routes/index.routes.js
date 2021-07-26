// 1. IMPORTS

const express           = require('express');
const router            = express.Router();
const indexController   = require('./../controllers/indexController')

// 2. ROUTES

router.get('/', indexController.startHome)

// 3. EXPORTS

module.exports = router