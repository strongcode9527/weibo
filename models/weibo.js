var mongoose = require('mongoose');

var weiboSchema  = require('../schemas/weibo');

var Weibo = mongoose.model('Weibo',weiboSchema);

module.exports = Weibo;