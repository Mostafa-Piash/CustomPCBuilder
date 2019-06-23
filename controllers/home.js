var express = require('express');
var router = express.Router();
var componentModel = require.main.require('./models/component-model');
var cartModel =  require.main.require('./models/cart-model');
var loginModel =  require.main.require('./models/login-model');
var randomstring = require("randomstring");

 






router.get('/home/system', function(req, res){

	var data = {


		price: 0,

		cpu: "CPU",
		cmodel: "Choose Your Component",
		cprice: "",
		cquantity: "",
		mobo: "Motherboard",
		mmodel: "Choose Your Component",
		mprice: "",
		mquantity: "",

		case: "Case",
		camodel: "Choose Your Component",
		caprice: "",
		caquantity: "",

		cf: "Casefan",
		cfmodel: "Choose Your Component",
		cfprice: "",
		cfquantity: "",
		

		

		kb: "Keyboard",
		kmodel: "Choose Your Component",
		kprice: "",
		kquantity: "",

		ram: "Memory",
		rmodel: "Choose Your Component",
		rprice: "",
		rquantity: "",

		mice: "Mouse",
		micemodel: "Choose Your Component",
		miceprice: "",
		micequantity: "",

		mnt: "Monitor",
		mntmodel: "Choose Your Component",
		mntprice: "",
		mntquantity: "",

		od: "Opticaldrive",
		odmodel: "Choose Your Component",
		odprice: "",
		odquantity: "",

		psu: "Powersupply",
		pmodel: "Choose Your Component",
		pprice: "",
		pquantity: "",

	   
		spkr: "Speaker",
		spkrmodel: "Choose Your Component",
		spkrprice: "",
		spkrquantity: "",

		strg: "Storage",
		smodel: "Choose Your Component",
		sprice: "",
		squantity: "",
		
	    gpu: "Videocard",
		gmodel: "Choose Your Component",
		gprice: "",
		gquantity: ""
		

	};

	if(req.session.cpu){
		data.cmodel = req.session.cpu.cpu;
		data.cprice = parseInt(req.session.cpu.price)||0;
		data.cquantity = req.session.cpu.quantity;
						
	}
	if(req.session.motherboard){
		data.mmodel = req.session.motherboard.motherboard;
		data.mprice = parseInt(req.session.motherboard.price)||0;
		data.mquantity = req.session.motherboard.quantity;
	}

	if(req.session.case){
		data.camodel = req.session.case.case;
		data.caprice = parseInt(req.session.case.price)||0;
		data.caquantity = req.session.case.quantity;
						
	}
	if(req.session.casefan){
		data.cfmodel = req.session.casefan.casefan;
		data.cfprice = parseInt(req.session.casefan.price)||0;
		data.cfquantity = req.session.casefan.quantity;
	}
	
	
	if(req.session.keyboard){
		data.kmodel = req.session.keyboard.keyboard;
		data.kprice = parseInt(req.session.keyboard.price)||0;
		data.kquantity = req.session.keyboard.quantity;
						
	}
	if(req.session.memory){
		data.rmodel = req.session.memory.memory;
		data.rprice = parseInt(req.session.memory.price)||0;
		data.rquantity = req.session.memory.quantity;
	}
	if(req.session.mice){
		data.micemodel = req.session.mice.mice;
		data.miceprice = parseInt(req.session.mice.price)||0;
		data.micequantity = req.session.mice.quantity;
						
	}
	if(req.session.monitor){
		data.mntmodel = req.session.monitor.monitor;
		data.mntprice = parseInt(req.session.monitor.price)||0;
		data.mntquantity = req.session.monitor.quantity;
	}
	if(req.session.opticaldrive){
		data.odmodel = req.session.opticaldrive.opticaldrive;
		data.odprice = parseInt(req.session.opticaldrive.price)||0;
		data.odquantity = req.session.opticaldrive.quantity;
						
	}
	if(req.session.powersupply){
		data.pmodel = req.session.powersupply.powersupply;
		data.pprice = parseInt(req.session.powersupply.price)||0;
		data.pquantity = req.session.powersupply.quantity;
	}
	
	if(req.session.speaker){
		data.spkrmodel = req.session.speaker.speaker;
		data.spkrprice = parseInt(req.session.speaker.price)||0;
		data.spkrquantity = req.session.speaker.quantity;
	}
	if(req.session.storage){
		data.smodel = req.session.storage.storage;
		data.sprice = parseInt(req.session.storage.price)||0;
		data.squantity = req.session.storage.quantity;
						
	}
	
	if(req.session.videocard){
		data.gmodel = req.session.videocard.videocard;
		data.gprice = parseInt(req.session.videocard.price)||0;
		data.gquantity = req.session.videocard.quantity;
						
	}


	//data.price =req.session.videocard.price+req.session.storage.price+req.session.speaker.price+req.session.opticaldrive.price+req.session.monitor.price+req.session.mice.price+req.session.memory.price+req.session.keyboard.price+req.session.casefan.price+ req.session.case.price+req.session.motherboard.price+req.session.cpu.price;
	//console.log(price);
	//data.price= data.cprice + data.mprice + data.caprice + data.cfprice + data.kprice + data.miceprice+ data.odprice + data.pprice + data.spkrprice + data.sprice + data.gprice + data.mntprice + data.rprice ;
	data.price= +data.cprice + +data.mprice + +data.caprice + +data.cfprice  + +data.miceprice + +data.odprice + +data.pprice + +data.spkrprice + +data.sprice + +data.gprice + +data.mntprice + +data.rprice ;
	
	res.render('home/system', {data:data, msg:""});

});

router.post('/home/system', function(req,res){
	
if(req.session.user){
	var data = {
		user: req.session.user.username,
		cpu: req.body.cpu,
		motherboard: req.body.mobo,
		storage: req.body.storage,
		memory: req.body.ram,
		gpu: req.body.gpu,
		psu: req.body.psu,
		case: req.body.case,
		cooler: req.body.cooler,
		speaker: req.body.speaker,
		monitor: req.body.monitor,
		mouse: req.body.mouse,
		keyboard: req.body.keyboard,
		opticaldrive: req.body.od,
		quantity:1,
		price:req.body.price,
		model:req.body.model
	};

	if(data.model){
		componentModel.setUserPC(data, function(result){});

		componentModel.getUserPC(data, function(result){
		//console.log(result[0]);
		var type = "custompc";
		var pid = result[0].id;
		res.redirect('/home/add-to-cart/'+pid+'/'+type+'/');
	});
	}

	else{
		var data = {


		price: 0,

		cpu: "CPU",
		cmodel: "Choose Your Component",
		cprice: "",
		cquantity: "",
		mobo: "Motherboard",
		mmodel: "Choose Your Component",
		mprice: "",
		mquantity: "",

		case: "Case",
		camodel: "Choose Your Component",
		caprice: "",
		caquantity: "",

		cf: "Casefan",
		cfmodel: "Choose Your Component",
		cfprice: "",
		cfquantity: "",
		

		

		kb: "Keyboard",
		kmodel: "Choose Your Component",
		kprice: "",
		kquantity: "",

		ram: "Memory",
		rmodel: "Choose Your Component",
		rprice: "",
		rquantity: "",

		mice: "Mouse",
		micemodel: "Choose Your Component",
		miceprice: "",
		micequantity: "",

		mnt: "Monitor",
		mntmodel: "Choose Your Component",
		mntprice: "",
		mntquantity: "",

		od: "Opticaldrive",
		odmodel: "Choose Your Component",
		odprice: "",
		odquantity: "",

		psu: "Powersupply",
		pmodel: "Choose Your Component",
		pprice: "",
		pquantity: "",

	   
		spkr: "Speaker",
		spkrmodel: "Choose Your Component",
		spkrprice: "",
		spkrquantity: "",

		strg: "Storage",
		smodel: "Choose Your Component",
		sprice: "",
		squantity: "",
		
	    gpu: "Videocard",
		gmodel: "Choose Your Component",
		gprice: "",
		gquantity: ""
		

	};
		res.render('home/system', {data:data, msg:"Model can't be empty!!!"});

	}	
}

else{
	res.redirect('/login');
}
	

	


});


router.get('/home', function(req, res){
 	if(!req.session.cart){
 		req.session.cart = {totalQty:0};
		componentModel.getCart(function(result){
			if(result.length > 0){
				req.session.cart = {totalQty:0 };
				componentModel.remove(function(result){
				});
			}
		});
 	}
 	if(!req.session.user){
 		var home = {
 			user:'Login',
 			login:'/login/signin'
 		};
 		req.session.home = home;
 	}
 	
	componentModel.getPc(function(result){
		res.render('home/index', {pcList: result, home: req.session.home });
	});


});

/*router.get('/home/add-to-cart/:id', function(req, res){
	var productId = req.params.id;
	var cart = new Cart(req.session.cart ? req.session.cart:{});
	componentModel.get(productId, function(result){

		cart.add(result, result.id);
		req.session.cart = cart;
		console.log(req.session.cart);
		res.redirect('/home');


	});
	

});

router.get('/home/cart', function(req, res){

	if(!req.session.cart){
 		return res.render('cart/cartView', {products:null});
 	}
	var cart = new Cart(req.session.cart); 

	console.log(cart.generateArray());
	componentModel.get(productId, function(result){

	res.render('cart/cartView', {products: result});
	});
	

});*/

router.get('/home/add-to-cart/:id/:type/', function(req, res){
	var productId = req.params.id;
	var type = req.params.type;
	
	if(type=="PC"){
		var cart = {
		id: req.session.cart.id,
		item: req.session.cart.item,
		price: req.session.cart.price,
		qty:req.session.cart.qty,
		totalQty: req.session.cart.totalQty,	
		totalPrice: req.session.cart.totalPrice,
		type: type
		
	};

	componentModel.getPC(productId, function(result){
		if(!cart.id){
			cart.totalPrice =0;
		}

		cart.id=result.id;
		cart.item= result.model;
		cart.price= result.price;
		cart.qty = 1;
		cart.totalQty=cart.totalQty+1; 	
		cart.totalPrice+=cart.price;
		req.session.cart = cart;

		//console.log(cart);
		cartModel.get(function(result){
				if(result.length == 0){
					cartModel.insert(cart, function(result){
							
					});	
				}
				else{
					for(var i=0; i< result.length; i++){

						if(result[i].item == cart.item){
							cart.qty = result[i].quantity+1 ;
							cart.price = cart.price*cart.qty; 
							cartModel.update(cart, function( result){
								
							});
						}
						else{
					
							cartModel.insert(cart, function( result){			
							});
						}
					}

				}
			});
		
		
					res.redirect('/home');
	});

	}

	if(type=="custompc"){
		if(req.session.user){
			var cart = {
		id: req.session.cart.id,
		item: req.session.cart.item,
		price: req.session.cart.price,
		qty:req.session.cart.qty,
		totalQty: req.session.cart.totalQty,	
		totalPrice: req.session.cart.totalPrice,
		type: type
		
	};

	componentModel.getUserPCbyID(productId, function(result){

		if(!cart.id){
			cart.totalPrice =0;
		}

		cart.id=result.id;
		cart.item= result.model;
		cart.price= result.price;
		cart.qty = 1;
		cart.totalQty=cart.totalQty+1; 	
		cart.totalPrice+=cart.price;
		req.session.cart = cart;
       
		console.log(cart);
		cartModel.get(function(result){
			cartModel.insert(cart, function(result){});	
		});
		
					res.redirect('/home/system');
		});
		}
		else{
			res.redirect('/login/');
		}
		

	}

	if(type =="processors"){
		var cart = {
		id: req.session.cart.id,
		item: req.session.cart.item,
		price: req.session.cart.price,
		qty:req.session.cart.qty,
		totalQty: req.session.cart.totalQty,	
		totalPrice: req.session.cart.totalPrice,
		type: type
		
	};

	componentModel.getCPU(productId, function(result){
		if(!cart.id){
			cart.totalPrice =0;
		}

		cart.id=result.id;
		cart.item= result.model;
		cart.price= result.price;
		cart.qty = 1;
		cart.totalQty=cart.totalQty+1; 	
		cart.totalPrice+=cart.price;
		req.session.cart = cart;

		//console.log(cart);
		cartModel.get(function(result){
				if(result.length == 0){
					cartModel.insert(cart, function(result){
							
					});	
				}
				else{
					for(var i=0; i< result.length; i++){

						if(result[i].item == cart.item){
							cart.qty = result[i].quantity+1 ;
							cart.price = cart.price*cart.qty; 
							cartModel.update(cart, function( result){
								
							});
						}
						else{
					
							cartModel.insert(cart, function( result){			
							});
						}
					}

				}
			});
		
		
					res.redirect('/home');
	});

	}

});



router.get('/home/cart', function(req, res){

	if(!req.session.cart){
 		return res.render('cart/cartView', {products:null});
 	}
	cartModel.get(function(result){

		res.render('cart/cartView', {products: result, totalPrice: req.session.cart.totalPrice} );
	});
	
	

});

router.get('/home/order', function(req, res){
	if(req.session.user){
		cartModel.get(function(result){
				if(result.length == 0){
					return;
				}
				else{
					for(var i=0; i< result.length; i++){
						var order = {
							itemID: result[i].pid,
							item: result[i].item,
							quantity: result[i].quantity,
							price: result[i].price,
							user: req.session.user.username,
							status: "purchased",
							date: "sysdate",
							address: req.session.userdetails.address ,
							phone: req.session.userdetails.phone

						};
					

 					

						if(result[i].type=="custompc"){
							order.status = "pending";
						}
						else{
							var type = {
								type: result[i].type,
								id: result[i].pid,
								quantity:0
							};
							
							cartModel.getQuantity(type, function(result){
								if(result[0].quantity>0){
									type.quantity = result[0].quantity-order.quantity;
									cartModel.updateQuantity(type, function(result){});	
								}
								
							});

							
						}
						//console.log(order);

						cartModel.setOrder(order, function(result){});

						cartModel.getReport(function(result){

							if(result.length == 0){
								cartModel.setReport(order, function(result){});
							}
							else{
								for(var j = 0 ; j<result.length; j++){

								
								if(result[j].item == order.item){
									var data = {
										item: result[j].item,
										quantity:result[j].quantity+order.quantity,
										price: result[j].price+order.price
									};

									cartModel.updateReport(data, function(result){

									});
								}
								else{
									cartModel.setReport(order, function(result){});
								}
								}
								
							}

						});
							
						
					}
					cartModel.remove(function(result){
							req.session.cart = null;
							res.redirect('/home');
						});

				}
			});

	}
	else{
		res.redirect('/login/signup');
		/*cartModel.get(function(result){
				if(result.length == 0){
					return;
				}
				else{
					for(var i=0; i< result.length; i++){
						var order = {
							itemID: result[i].pid,
							item: result[i].item,
							quantity: result[i].quantity,
							price: result[i].price,
							user: "guest",
							status: "purchased",
							date: "sysdate",
							address:"",
							phone: ""

						};
						if(result[i].type=="custompc"){
							order.status = "pendeing";
						}
						else{
							var type = {
								type: result[i].type,
								id: result[i].pid,
								quantity:0
							};
							
							cartModel.getQuantity(type, function(result){
								type.quantity = result[0].quantity-order.quantity;
								cartModel.updateQuantity(type, function(result){});	
							});

							
						}
						//console.log(order);

						cartModel.setOrder(order, function(result){});
							
						
					}
					cartModel.remove(function(result){
							req.session.cart = null;
							res.redirect('/home');
						});

				}
			});*/
	
	}

		

});


module.exports = router;