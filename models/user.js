var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		require: true
	},
	image:{
		type: String,
		require: true
	},
	profileId:{
		type: String,
		require: true
	}
});

module.exports = mongoose.model('User', userSchema);