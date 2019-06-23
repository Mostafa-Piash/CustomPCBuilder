var db = require('./db');
module.exports = {
	verifyUser: function(user, callbackFromController){
		var sql = "SELECT * FROM users WHERE username=? AND password=?";
		console.log(sql);	 
		db.execute(sql, [user.username, user.password], function (result){
			
			if(result.length == 1)
			{
				callbackFromController(result);
			}
			else
			{
				callbackFromController(false);
			}
		});
	},

	signupUser: function(user, callbackFromController){
		var sql ="INSERT INTO users (userId, username, password, type) VALUES (null,?,?,?)";
		db.execute(sql, [user.username, user.password, 'user'], function(result){
				callbackFromController(result);
		});
	},

	userDetails: function(user, callbackFromController){
		var sql ="INSERT INTO userdetails (id, name, address, phone, username) VALUES (null,?,?,?,?)";
		db.execute(sql, [user.name, user.address, user.phone, user.username], function(result){
				callbackFromController(result);
		});
	},
	
	getUserDetails: function(user, callbackFromController){
		var sql = "SELECT * FROM userdetails WHERE username=?";

		db.execute(sql, [user.username], function(result){
				callbackFromController(result);
		});
	},
	update: function(user, callbackFromController){
		var sql ="Update users SET password=? WHERE username=?";
		db.execute(sql, [user.newpassword, user.username], function(result){
				callbackFromController(result);
		});
	}
};