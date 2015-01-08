var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('about');
});

router.post('/', function(req, res) {
  console.log(req.body);
  res.render('about',{login: req.body});
});

module.exports = router;