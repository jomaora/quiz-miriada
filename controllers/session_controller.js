'use strict'

exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(err, user) {
		if (err) {
			req.session.errors = [{"message":"Error " + err}];
			res.redirect('/login');
			return;
		}

		req.session.user = {
			id: user.id,
			username: user.username 
		};

		res.redirect(req.session.redir.toString());
	});
};

exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect('/login');
};

exports.loginRequired = function(req, res, next) {
	console.log('user', req.session.user);
    if (req.session.user) {
        next();
    }
    else {
        res.redirect('/login');
    }
};