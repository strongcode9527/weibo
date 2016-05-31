var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
	reply_name:String,
	content:String,

	likes:Number,
	img:String
})


var weiboSchma = new mongoose.Schema({
	content:String,
	reply:[Comment],
	user_name:String,
	img:String,
	likes:Number
	
});


module.exports = weiboSchma;