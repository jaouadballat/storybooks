var express = require('express');
var router = express.Router();
var auth = require('../config/auth');
var Story = require('../models/story');

/* GET home page. */
router.get('/public', function(req, res, next) {
	Story.find({status: 'public'}).populate("user").exec(function(err, stories){
		if(err){
			console.log(err)
		}else{
		  res.render('public_stories', {
		  	stories: stories
		  });
		}
	})
});

router.get('/dashboard',auth, function(req,res){
	console.log(req.user._id)
	Story.find({}).where('user').equals(req.user).exec(function(err, stories){
		if(err){
			console.log(err)
		}else{
			res.render('dashboard', {
				stories: stories

			});
		}
	});
});

router.get('/edit/:id',auth, function(req, res){
	Story.findById(req.params.id).exec(function(err, story){
		if(err){
			console.log(err)
		}else{
			res.render("edit_story", {
				story: story
			});
		}
	});
});

router.get('/add', function(req, res, next) {
  res.render('add_story');
});

router.get('/show/:id', function(req, res){
	Story.findById(req.params.id).populate('user').exec(function(err, story){
		if(err){
			console.log(err)
		}else{
			res.render('show', {
				story: story
			});
		}
	});
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

router.post('/update/:id',auth, function(req, res){
	Story.findById(req.params.id, function(err, story){
		if(err){
			console.log(err)
		}else{
			let allowComments;
			if (req.body.allowComments) {
			    allowComments = true
			} else {
			    allowComments = false
			}
			story.title = req.body.title,
		    story.status = req.body.status,
		    story.body = req.body.body,
		    story.allowcomments = allowComments
		    story.save(function(err, story){
		    	if(err){
		    		console.log(err)
		    	}else{
					res.redirect("/stories/dashboard")
		    	}
		    })
		}

	});
});

module.exports = router;
