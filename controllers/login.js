var express = require('express');
var router = express.Router();
var loginModel =  require.main.require('./models/login-model');
var cartModel = require.main.require('./models/cart-model');



router.get('/login', function(req, res){
 	
		res.redirect('/login/signin')

});
router.get('/login/changepass', function(req, res){
	res.render('user/changePassword', {msg:""});
});

router.post('/login/changepass', function(req, res){
	var data = {
		username: req.body.username,
		password: req.body.oldpassword,
		newpassword: req.body.password,
		confirmpassword: req.body.cpassword
	};
	loginModel.verifyUser(data, function(result){
		if(result){

			if(data.newpassword && data.newpassword === data.confirmpassword){
				loginModel.update(data, function(result){
 					res.redirect('/remove/logout');
 				});	
			}
			else{
				res.render('user/changePassword', {msg:"password didn't match"});
			}
 				
 		}
 		else{
 			res.render('user/changePassword', {msg:"Incorrect username or password"});	
 		}



	});
	//res.render('user/changePassword', {msg:""});
});


router.get('/login/userprofile', function(req, res){
	   var user ={
	   	username:req.session.user.username
	   };

		loginModel.getUserDetails(user, function(result){

			cartModel.getOrderByUser(user.username, function(order){
			
				res.render('user/userprofile' , {user: result, data: order, home: req.session.home });
			});
			

		});
 	
		


});


router.get('/login/signin', function(req, res){
 	
		res.render('login/signin');


});

router.post('/login/signin', function(req, res){
 	
			var login = {
 			username: req.body.username,
 			password: req.body.password,
 			};
 			var data = {
 				address: "",
 				phone: "",
 			};
 			if(login.username!='admin'){
 				loginModel.getUserDetails(login, function(result){

 				data.address= result[0].address;
 				data.phone= result[0].phone;
 				req.session.userdetails = data;
 				
 			});
 			}
 			

 			loginModel.verifyUser(login, function(result){
 			if(result){
 				if(result[0].type == "user"){
 					var home = {
 					user:result[0].username,
 					login: '/login/userprofile'
 					};
 					req.session.home = home;
 					req.session.user = login;
 					
 					res.redirect('/home');
 				}

 				else if(result[0].type == "admin"){
 					var home = {
 					user:result[0].username,
 					login: '/admin'
 					};
 					req.session.home = home;
 					req.session.user = login;
 					res.redirect('/admin');
 				}				
 				
 			}
 			else{
 				res.redirect('/login');
 			}

 		});


});
       

router.get('/login/signup', function(req, res){
 	
		res.render('login/signup');


});
router.post('/login/signup', function(req, res){
	var signup = {
 			username: req.body.username,
 			password: req.body.password,
 			confirmpassword:  req.body.cpassword
 			};
 		var home = {
 				user: signup.username,
 				login: '/login/userprofile'
 		};


 	loginModel.signupUser(signup, function(result){
 		if(result){
 			req.session.user = signup;
 			req.session.home = home;
 			res.redirect('../login/userdetails');
 		}
 		else{
 			res.redirect('/login/signup');
 		}
 		
 	});
		
});
router.get('/login/userdetails', function(req, res){
 	
		res.render('login/userdetails');


});

router.get('/login/userdetails', function(req, res){
 	
		res.render('login/userdetails');


});
router.post('/login/userdetails', function(req, res){
		var userdetails = {
 			name: req.body.name,
 			address: req.body.address,
 			phone:  req.body.mobile,
 			username: req.session.user.username
 			};
 			req.session.user.address = req.body.address;
 			req.session.user.phone = req.body.mobile;

 			loginModel.userDetails(userdetails, function(result){
 				req.session.userdetails = userdetails;
 				res.redirect('/home');
 		});
 	
		


});



module.exports = router;