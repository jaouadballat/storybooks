var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = new Schema({
	title: {
		type: String,
		require: true
	},
	status:{
		type: String,
		default: 'public'
	},
	allowcomments:{
		type: Boolean,
		default: true
	},
	body: {
		type: String,
		require: true
	},
	date: {
		type: Date,
		default: Date.now()
	},
	user: {
		 type: Schema.Types.ObjectId, ref: 'User'
	},
	comments: [{
		bodyComment: {
			type: String
		},
		date: {
			type: Date,
			default: Date.now
		},
		user: { type: Schema.Types.ObjectId, ref: 'User' }
	}]
});

module.exports = mongoose.model('Story', storySchema);