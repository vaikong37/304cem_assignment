var http = require('http');
var fs = require("fs");
var qs = require('querystring');

var MongoClient = require('mongodb').MongoClient;
var dbUrl = "mongodb://localhost:27017/";


http.createServer(function(request, response) {

	if(request.url === "/index"){
		console.log("loading main page");
		
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url === "/"){
		
		sendFileContent(response, "index.html", "text/html");
	}
	else if(request.url === "/game"){
		
		sendFileContent(response, "game.html", "text/html");
	}
	else if(request.url === "/others"){
		
		sendFileContent(response, "others.html", "text/html");
	}
	else if(request.url === "/loclist"){
		
		sendFileContent(response, "loclist.html", "text/html");
	}
	else if(request.url === "/Taipei_101"){
		
		sendFileContent(response, "loclist_1.html", "text/html");
	}
	else if(request.url === "/Xiaonan_City_God_Temple"){
		
		sendFileContent(response, "loclist_2.html", "text/html");
	}
	else if(request.url === "/Dragon_and_Tiger_Pagodas"){
		
		sendFileContent(response, "loclist_3.html", "text/html");
	}
	else if(request.url === "/Sun_Moon_Lake"){
		
		sendFileContent(response, "loclist_4.html", "text/html");
	}
	else if(request.url === "/Jiufen"){
		
		sendFileContent(response, "loclist_5.html", "text/html");
	}
	else if(request.url === "/National_Taitung_University"){

		sendFileContent(response, "loclist_6.html", "text/html");
	}
	else if(request.url === "/Brown_Avenue"){
		
		sendFileContent(response, "loclist_7.html", "text/html");
	}
	else if(request.url === "/Sanxiantai"){
		
		sendFileContent(response, "loclist_8.html", "text/html");
	}
	
	
    else if(request.url==="/test"){

		//====================== (insert data to mongoDB) ======================
		
        if (request.method === "POST") {
            console.log("======test======");
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {
			formData += data;
			console.log(formData);
		  
			return request.on('end', function() {
				var user;
				user = qs.parse(formData);
				
				msg = JSON.stringify(user);
            
				info=formData.split("&");  //get user data
            
				for(i=0; i<info.length; i++){
                
					var d=info[i].split("=");

				}
            
				console.log(d[0]);
				console.log(d[1]);
				

				stringMsg = JSON.parse(msg);
				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var myobj = stringMsg;

					dbo.collection("customers").insertOne(myobj, function(err, res) {

						if (err) throw err;

						console.log("1 document inserted ============");
	
						db.close();

					});
	
				});	
		  
		
            response.end("completed");
			});

			});
	
		} else {
       
        sendFileContent(response, "index.html", "text/html");
  
		}	
	}
	
	
//=========================== Register (insert data to mongoDB) ===========================
	
	    else if(request.url==="/register"){

        if (request.method === "POST") {
            console.log("======register======");
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {
			formData += data;
			console.log(formData);
		  
			return request.on('end', function() {
				var user;
				user = qs.parse(formData);
				
				msg = JSON.stringify(user);
            
				info=formData.split("&");  //get user data
            
				for(i=0; i<info.length; i++){
                
					var d=info[i].split("=");

				}
            
				console.log(d[0]);
				console.log(d[1]);
				//console.log(info[0]);  //login name
				//console.log(info[1]);  //password

				stringMsg = JSON.parse(msg);
				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var myobj = stringMsg;

					dbo.collection("customers").insertOne(myobj, function(err, res) {

						if (err) throw err;

						console.log("1 document inserted ============");
	
						db.close();

					});
	
				});	
		  
            response.end("Register sucessful!");
			});

			});
	
		} else {
        
        sendFileContent(response, "register.html", "text/html");
  
		}	
	}
	
	

	
	
//==================================== add my fav =======================================
	
	else if(request.url==="/homeLoged"){

        if (request.method === "POST") {
            console.log("======add my Fav list======");
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {		//get value from client side:(data)
			formData += data;
			console.log(formData);
		  
			return request.on('end', function() {
				var user;
				user = qs.parse(formData);
				
				msg = JSON.stringify(user);

				info=formData.split("&");  //get user data
            
				for(i=0; i<info.length; i++){
                
					var myFavTemp = info[i].split("=");
                
				}
            
				console.log("login Email = " +myFavTemp[0]);
				console.log("Fav item = " +myFavTemp[1]);
				//console.log(info[0]);  //login name
				//console.log(info[1]);  //password

				stringMsg = JSON.parse(msg);
				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var myobj = stringMsg;

					dbo.collection("favlist").insertOne(myobj, function(err, res) {

						if (err) throw err;

						console.log("1 document inserted to favlist============");
	
						db.close();

					});
	
				});	
		  
            response.end("add to my favlist");
			});

			});
	
		} else {

        sendFileContent(response, "myFav.html", "text/html");
  
		}	
	}
	
	
//==================================== del my fav =======================================
	
	else if(request.url==="/delfav"){

        if (request.method === "POST") {
            console.log("======del my Fav list======");
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {		//get value from client side:(data)
			formData += data;
			console.log(formData);
		  
			return request.on('end', function() {
				var user;
				user = qs.parse(formData);
				
				msg = JSON.stringify(user);

				info=formData.split("&");  //get user data
				for(i=0; i<info.length; i++){
					var myFavTemp = info[i].split("=");
				}
            
				console.log("login Email = " +myFavTemp[0]);
				console.log("Fav item = " +myFavTemp[1]);
				console.log(info[0]);  //login name
				console.log(info[1]);  //password


				stringMsg = JSON.parse(msg);
				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var myobj = stringMsg;

					dbo.collection("favlist").deleteOne(myobj, function(err, res) {

						if (err) throw err;

						console.log("1 document deleted from favlist============");
	
						db.close();

					});
	
				});	

            response.end("ok for del one_favlist");
			
			});

			});
	
		} else {

        sendFileContent(response, "myFav.html", "text/html");
  
		}	
	}
	
	
	//========================== (login) =============================
	
	else if(request.url==="/login"){

		console.log("===/login page!!=================");

        if (request.method === "POST") {
            
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {
			formData += data;

			return request.on('end', function() {
				var user;
				user = qs.parse(formData);

				msg = JSON.stringify(user);

				info=formData.split("&");  //get user data & split
			
				var d = info[0].split("=");  //split login data
				var e = info[1].split("=");  //split password data
				
				console.log("login Email = "+d[1]);
				
				console.log("password = "+e[1]);

				stringMsg = JSON.parse(msg);
				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var myobj = stringMsg;
					
					var query_chk = { loginEmail: d[1] , password1: e[1]};   // for query_(login id)_(login pwd)


					//db query (check login id & pwd  & add my Fav list)===================
					dbo.collection("customers").find(query_chk).toArray(function(err, result) {	

					if (err) throw err;
						console.log(result);

					var array=[];

						for (var i=0; i < result.length; i++){
							array.push(result[i].loginEmail);
						}			
				
					if (err) throw err;

						console.log("myFav: "+array.toString());
						db.close();

						if (result != ""){
							console.log("check login ok la!");
							
							response.end("Login Successful&"+d[1].toString());	
							
						}else{
							console.log("Please register first!");
						}


						return response.end(array.toString());					
					});				
					
					//end of db query (add my Fav list)========================


				});	

			});

			});
	
		} else {

        sendFileContent(response, "login.html", "text/html");
  
		}
 
	}
	
	
	
	
	//======================== (show myFav list) ======================
	
	else if(request.url==="/myFav"){

		console.log("========/show myFav list page!!=============");
		
		
        if (request.method === "POST") {
            
			formData = '';
		
			return request.on('data', function(data) {
			formData += data;
			
			return request.on('end', function() {
								
				console.log("user login by = "+formData);

				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");

					var query_chk = { loginEmail: formData };   // for query_(login email)

					//db query (find user info by used User name)===================
					dbo.collection("favlist").find(query_chk).toArray(function(err, result) {	

					if (err) throw err;
						console.log("query check = " +result);

					//save the result to array
					var array=[];
						for (var i=0; i < result.length; i++){
							array.push(result[i].favItem);		//get value from column "favItem"
						}			
				
					if (err) throw err;

						console.log("my Fav list = "+array.toString());
						db.close();

						if (result != ""){
							console.log(">>> Got my Fav list! <<<");
							
							response.end(array.toString());	
							
						}else{
							console.log(">>> No Fav list found! <<<");
						}
				
					});				
			

				});	
		  
			});

			});
	
		} else {
		
        sendFileContent(response, "myFav.html", "text/html");
  
		}
 
	}
	
	
	//======================== (update info) ======================
	
	else if(request.url==="/update"){

		console.log("======== update user info =============");
		
        if (request.method === "POST") {
            
			formData = '';
			msg = '';
			
			return request.on('data', function(data) {
			formData += data;
			
			return request.on('end', function() {

				var user;
				user = qs.parse(formData);
				msg = JSON.stringify(user);
				info=formData.split("&");  //get user data
            
				var f = info[0].split("=");  //split loginEmail data
				var g = info[1].split("=");  //split currPwd data
				var h = info[2].split("=");  //split userName data
				var i = info[3].split("=");  //split newPwd data

				console.log("f[0] = "+f[0]);  
				console.log("f[1] = "+f[1]);  //loginEmail value
				console.log("g[0] = "+g[0]);
				console.log("g[1] = "+g[1]);  //currPwd value
				console.log("h[0] = "+h[0]);
				console.log("h[1] = "+h[1]);  //userName value
				console.log("i[0] = "+i[0]);
				console.log("i[1] = "+i[1]);  //newPwd value
				
				//console.log("info[0] = "+info[0]);  //login name
				//console.log("info[1] = "+info[1]);  //password
							
				stringMsg = JSON.parse(msg);


				MongoClient.connect(dbUrl, function(err, db) {

				if (err) throw err;

					var dbo = db.db("mydb");
					var myobj = stringMsg;
					
					// for check current password
					var query_chk = { loginEmail: f[1] , password1: g[1]};   // for query_(login id)_(login pwd)
					
					dbo.collection("customers").find(query_chk).toArray(function(err, result) {	

					if (err) throw err;
						console.log(result);
				
						if (result != ""){
							
							console.log("Checked current password correct!");
							//response.end("Login Successful")
							//response.end("Login Successful&"+f[1].toString());
							
						// for update user data ----------
							var query_update = { loginEmail: f[1] };
							var newvalues = { $set: {username: h[1], password1: i[1] } };
							
							dbo.collection("customers").updateOne(query_update, newvalues, function(err, res) {
							
							if (err) throw err;
								console.log("========== User data updated!! ==========");
								
							});
						
						db.close();
								
						}else{
							console.log("Incorrect current password!");
							response.end("Incorrect current password!")
						}
						
					

					});
	
				});	
		  
			
            response.end("Register successful!");
			});

			});
	
		} else {
     
        sendFileContent(response, "update.html", "text/html");
  
		}	
	}
	
	

		
	
	
	
	
	else if(request.url === "/content_p1"){
		console.log("loading to content_p1");
		sendFileContent(response, "main_1.html", "text/html");
	}
	
	
	else if(/^\/[-\/\.a-zA-Z0-9_\/]*.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/javascript");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.css$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/css");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.min.js$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/min.javascript");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.png$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/png");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.jpg$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/jpg");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.ico$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ico");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.woff$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/woff");
	}else if(/^\/[-\/\.a-zA-Z0-9_\/]*.ttf$/.test(request.url.toString())){
		sendFileContent(response, request.url.toString().substring(1), "text/ttf");
	}
	else{
		console.log("Requested URL is: " + request.url);
		response.end();
	}
}).listen(9999)

function sendFileContent(response, fileName, contentType){
	fs.readFile(fileName, function(err, data){
		if(err){
			response.writeHead(404);
			response.write("Not Found!");
		}
		else{
			response.writeHead(200, {'Content-Type': contentType});
			response.write(data);
		}
		response.end();
	});
}