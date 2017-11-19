var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var Story = require('../models/story');

/* GET home page. */
router.get('/dashboard',auth, function(req, res, next) {
  res.render('dashboard');
});

router.get('/add', function(req, res, next) {
  res.render('add_story');
});

router.post('/', function(req, res, next) {
	let allowComments;
	if (req.body.allowComments) {
	    allowComments = true
	} else {
	    allowComments = false
	}
	console.log(allowComments)
	var newStory = new Story({
	    title: req.body.title,
	    status: req.body.status,
	    body: req.body.body,
	    allowcomments: allowComments,
	    user: req.user._id
	});
	newStory.save(function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect('/');
		}
	});
});
module.exports = router;
