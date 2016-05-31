var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var url = require('url');
var Weibo = require('./models/weibo');
var User = require('./models/user');
var Comment = require('./models/comment')
var querystring = require('querystring')
var path = require('path');
var _ = require('underscore');
var session = require('express-session');
var mongostore = require('connect-mongo')(session);
var dbUrl = 'mongodb://localhost/strong';

var app = express();

app.set('views','./views');
app.set('view engine','jade');

mongoose.connect(dbUrl);
app.use(cookieParser());
app.use(session({
	secret:'strong',
	store: new mongostore({
		url:dbUrl,
	  collection:'sessions'
	})
}))

app.use(bodyParser.urlencoded({extend:true}));
app.use(express.static(path.join(__dirname,'public')));

app.listen(3000);
console.log('node start at 3000');

app.get('/',function(req,res,next){
	var weibos;


	Weibo.find({},function(err,data){

		weibos = data;
	
		var user = req.session.user;
		
		res.render('index.jade',{
			user:user,
			weibos:weibos,
			
		})
	})

	

});


app.post('/new',function(req,res){
	
 var userObj = req.body.user;
	var _User = new User({
		user_name:userObj.name,
		user_password:userObj.password,
		user_email:userObj.email
	})

	User.find({user_name:userObj.name},function(err,data){
		if(data.length == 0){
			
			_User.save(function(err,weibo){
				if(err){
							console.log(err);
						}
					})
						

			}
  })
})

app.get('/judje_name',function(req,res){
	var userNameObj = url.parse(req.url,true);   //第二个参数将query解析成对象否则为字符串
	 
	 	User.find({user_name:userNameObj.query.userName},function(err,data){
	 	
		if(data.length != 0){
			var userObj = req.body.user;
			app.locals.user = req.body.user;
			
			res.send({
				isExist:true
			})

		}else{
			res.send({
				isExist:false
			})
		}
  })

})

app.post('/login',function(req,res){
	var loginObj = req.body;
	User.find({
		user_name:loginObj.userName,
		user_password:loginObj.userPassword
	},function(err,data){
		console.log(data);
		if(err){
			console.log(err);
		}else{
			
			if(data.length == 0){
				
				res.send({
					isExist:false
				})
			}else{
			

				req.session.user = loginObj;
				res.redirect('/');

			}
		}
	})
})

app.post('/logout',function(req,res){
	delete req.session.user;
	res.redirect('/');
})

app.post('/comment',function(req,res){
	 var id = req.body._id;
	 var userName = req.body.userName;
	 Weibo.find({_id:id},function(err,data){
	 	 if(err){
	 	 	console.log(err);
	 	 }
	 	
	 	 res.render('comment.jade',{comments:data[0].reply,userName:userName,Weibo_id:data[0]._id},function(err,html){
	 	 	 if(err){
	 	 	 	console.log(err);
	 	 	 }else{
	 	 	 	 res.send(html);
	 	 	 }
	 	  
	 	 })
	 })
})

app.post('/other_comment',function(req,res){
	   
	 var _id = req.body._id;
	 var content = req.body.comment_content;
	 var name = req.body.reply_name;
	 userName = req.body.userName;
	 console.log( "name" + name);
	 var comment = new Comment({
      reply_name:name,
      reply_id:"String",
      content:content,
    	likes:0,
      img:"String"        
   })
	 Weibo.find({_id:_id},function(err,data){
	 	if(err){
	 		console.log(err);
	 	}else{
	 		data[0].reply.unshift(comment);
	 		data[0].save();
			res.render('comment.jade',{comments:data[0].reply,userName:userName,Weibo_id:data[0]._id},function(err,html){
				res.send({html:html,length:data[0].reply.length});
			})
	 	}
	 })
})

app.post('/fabo',function(req,res){
	var content = req.body.content;
	var user_name = req.body.user_name;
	var _weibo = new Weibo({
		content:content,
		reply:[],
		user_name:user_name,
		img:"String",
		likes:0
	})
	_weibo.save(function(err,data){

	});
})

app.post('/weibo_dianzan',function(req,res){
	var _id = req.body._id;
	Weibo.find({_id:_id},function(err,data){
		if(err){
			console.log(err);
		}else{
			data[0].likes += 1;
			data[0].save(function(err,weibo){
				if(err){
					console.log(err);
				}else{
					res.send({likes:data[0].likes});
				}
			});
			
		
		}
	})
	
})
app.post('/comment_dianzan',function(req,res){
	var weibo_id = req.body.weibo_id;
	var comment_id = req.body.comment_id;
	 Weibo.find({_id:weibo_id},function(err,data){
	 	if(err){
	 		console.log(err);
	 	}else{
	 		for(var i = 0 ; i < data[0].reply.length; i++){
	 			if(data[0].reply[i]._id == comment_id){
	 				 data[0].reply[i].likes++;
	 				   
	 				 
	 				 break;
	 				  
	 			}
	 		}
	 		data[0].save(function(err,data_){
	 			 if(err){
	 			 	console.log(err)
	 			 }else{
	 			 	console.log('success')
	 			 	console.log(data[0].reply[i].likes);
	 			 	res.send({sum:data[0].reply[i].likes});
	 			 }
	 		});
	 	}

	 })
})
