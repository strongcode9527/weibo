var mongoose = require('mongoose');
var userSchema = require('../schemas/comment.js');

var comment = mongoose.model('comment',userSchema);

module.exports  = comment; 