var express = require('express');
var router = express.Router();
var session = require('express-session');
var db = require('../dbOperations');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   console.log('users router');
//   res.send('respond with a resource');
// });

router.get('/login', (req, res) => {

	if (req.session.username === "tuntematon")
		res.render('login', {
			title: 'Kirjaudu',
			login: req.session.username
		});
	else {
		return res.redirect('/');
	}
});


router.post('/login', (req, res) => {
	db.verifyUserId(req, function (data) {
		if (data == "Access denied") {
			return res.render('alert', {
				login: req.session.username,
				title: 'Tietokantaan ei saa nyt yhteyttä. Yritä myöhemmin uudestaan'
			});
		} else if (data == "not exist") {
			return res.render('register', {
				title: 'Tietojasi ei löytynyt. Rekisteröidy ennen käyttöä!',
				login: req.session.username,
			});
		} else if (data == "not valid") {
			return res.render('alert', {
				login: req.session.username,
				title: 'Salasana ei täsmää?'
			});
		} else if (data == "exist") {
			req.session.username = req.body.username;
			return res.redirect('/');
		} else {
			return res.render('error', {
				message: 'Virhetoiminto: Ota yhteyttä järjestelmän ylläpitäjään',
				error: data
			});
		};
	});
});

router.get('/logout', (req, res) => {
	req.session.destroy();
	return res.redirect('/');
});

module.exports = router;
