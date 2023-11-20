const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');


/* GET home page. */
router.get('/', indexController.getJSONIndex );
// router.get('/testJSON', indexController.testJSON );


module.exports = router;
