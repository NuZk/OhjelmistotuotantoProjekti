var createError = require('http-errors');
var express = require('express');
var router = express.Router();
var session = require('express-session');

router.get('/', (req, res) => {
	if(req.session.username == "tuntematon")
		res.render('login', {
			title: 'Kirjaudu'
		});
	else {
		req.session.username = "tuntematon";
		req.session.password = "";
		return res.redirect('/');
	}
});

router.post('/', (req, res) => {
	req.session.password = req.body.passwd;
	req.session.username = req.body.userid;
	return res.redirect('/');
});

module.exports = router;
