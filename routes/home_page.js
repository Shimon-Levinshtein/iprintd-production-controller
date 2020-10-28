var express = require('express');
var router = express.Router();
const ejs = require('ejs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home_page', { title: 'Home page'});
});



module.exports = router;
