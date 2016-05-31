var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	user_name:String,
	user_password:String,
	user_email:String
})

module.exports = userSchema;