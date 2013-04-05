var express = require('express'),
	driver = require('couchbase')
	;
	
dbConfiguration = {
		"hosts": ["localhost:8091"],
		"bucket": "node"
	};	
	
	
driver.connect(dbConfiguration, function(err, cb) {
		if (err) {
			throw (err)
		}

		var app = module.exports = express();
		app.use(express.bodyParser());
		


		app.get("/",function(req, res) {
			res.send(200)
		});


		app.put("/:id",function(req, res) {	
			cb.replace( req.params.id, req.body,  function(err, meta) {
				
				if (err) {
					if (err.code == 13) {
						res.send(404);
					} else {
						res.send(500);
					}
					
					console.log(err);
				} else {
					res.send(200);
				}
				
			});
		});
		
		
		app.post("/:id",function(req, res) {	
			cb.set( req.params.id, req.body,  function(err, meta) {
				if (err) {
					res.send(500);
					console.log(err);
				} else {
					res.send(200);
				}
			  		  });
		});


		app.delete("/:id",function(req, res) {	
			cb.remove( req.params.id,  function(err, meta) {
				
				if (err) {
					if (err.code == 13) {
						res.send(404);
					} else {
						res.send(500);
					}
					
					console.log(err);
				} else {
					res.send(200);
				}
				
			});
		});


		appServer = app.listen(3000, function() {
			console.log("Express server listening on port %d in %s mode", appServer.address().port, app.settings.env);
		});

});