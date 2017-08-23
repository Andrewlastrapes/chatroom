var express = require('express');
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var User = require('../models/user');

router.get('/register', function(req, res){
	res.render('register');
});

router.get('/login', function(req, res){
	res.render('login');
});

router.get('/chatroom', function(req, res){
	res.render('chatroom', {layout: false});
});



console.log("hi")

router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;

	// req.checkBody('username', "Username field cannot be empty.").notEmpty();
 //   	req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
	// req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
	// req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
	// req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
	// req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
	// req.checkBody('passwordMatch', 'Password must be between 8-100 characters long.').len(8, 100);
	// req.checkBody('passwordMatch', 'Passwords do not match, please try again.').equals(req.body.password);
	// req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

	var errors = req.validationErrors();

	if (errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		});

		req.flash("success_msg", "You are registered and can now login");
		res.redirect('/users/login');
	}
	
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});




router.post('/login',
  passport.authenticate('local', {successRedirect:'chatroom', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('users/chatroom');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;
 