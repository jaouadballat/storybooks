var TwitterStrategy = require('passport-twitter').Strategy;
var key = require('./keys');
var User = require('../models/user');

 module.exports = function(passport){
 		 // twitter login
	 	passport.use(new TwitterStrategy({
	    consumerKey: key.twitter.consumerKey,
	    consumerSecret: key.twitter.consumerSecret,
	    callbackURL: "http://localhost:3000/users/auth/twitter/callback"
	  },
	  function(accessToken, refreshToken, profile, done) {
	      User.findOne({profileId: profile.id}, function(err, user){
	      	if(user) {
	      		return done(null, user);
	      	}else{
	      		new User({
	      			profileId: profile.id,
	      			username: profile.displayName,
	      			image:  profile.photos[0].value
	      		}).save(function(err, user){
	      			if(err){
	      				console.log(err)
	      			}else{
	      				return done(null, user);
	      			}
	      		})
	      	}
	      })
	  }
	));

 	passport.serializeUser(function(user, done) {
 	    done(null, user.id);
 	});

 	passport.deserializeUser(function(id, done) {
 	    User.findById(id, function(err, user) {
 	        done(err, user);
 	    });
 	});
 }