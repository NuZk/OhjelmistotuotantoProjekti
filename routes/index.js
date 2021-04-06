var express = require('express');
var router = express.Router();
var db = require('../dbOperations');
var createError = require('http-errors')




/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.session.username === undefined) {
		req.session.username = "tuntematon";
		// req.session.password = ""
	}
	db.findMessages(function (msg) {
		return res.render('index', {
			title: 'Naks ja PAM!!',
			login: req.session.username,
			// admin: req.session.username,
			messages: msg
		});
	});
});


router.get('/shop', function (req, res, next) {
	return res.render('shop', {
		login: req.session.username,
		title: 'Naks ja PAM!!-Shop'
	});
});
router.get('/cart', function (req, res, next) {
	return res.render('cart', {
		login: req.session.username,
		title: 'Naks ja PAM!!-Kori'
	});
});
router.get('/post', function (req, res, next) {
	return res.render('postform', {
		login: req.session.username,
		title: 'Naks ja PAM!!-Palauteosio'
	});
});
router.get('/bandmembers', function (req, res, next) {
	return res.render('bandmembers', {
		login: req.session.username,
		title: 'Naks ja PAM!!-Bändin jäsenet'
	});
});



router.post('/post', function (req, res, next) {
	db.createMessage(req.body, function (rvalue) {
		
		if (rvalue)
			return res.redirect('/');
			
		else
			console.log("Pieleen meni");
	});
});


module.exports = router;