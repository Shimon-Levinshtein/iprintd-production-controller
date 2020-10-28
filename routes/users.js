var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/signIn')
});
router.post('/login', function(req, res, next) {
  res.render('users/signIn')
});

module.exports = router;
