var express = require('express');
var router = express.Router();

var nicknames = [];

// Get Request to index page for chating.
router.get('/', function(req, res) {
  res.render('chat/index');
});

router.get('/nickManage', function(req, res) {
  res.render('nickManage');
})

// Get Post to join chating.

module.exports = router;
