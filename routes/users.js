var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res) {
  var id = req.params.id;
  var users = {
    1 : {
		first_name: 'Peisheng',
		last_name: 'Ye',
		contact: '123456789'
	},
	2 : {
		first_name: 'Liyi',
		last_name: 'Zhou',
		contact: '987654321'
	}
  };
  res.render('users',{user: users[id]});
});

module.exports = router;
