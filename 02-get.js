var driver = require('couchbase');

dbConfiguration = {
	"hosts": ["localhost:8091"],
	"bucket": "node"
};


driver.connect(dbConfiguration, function(err, cb) {
	if (err) {
		throw (err)
	}


	var i = 0;
	while(i<=100) {
		var product = {"type" : "product", "name" : "Product with id + "+ i +""};
		cb.set("product:"+i,product, function(err, meta) {});
		console.log("inserting product "+ i);
		
		i++;
	}


	cb.get("product:45", function(errs, doc, metas) {
		console.log("=== get the document ===");
		console.log( doc );

	});



	var keys = new Array();
	keys.push("product:1");
	keys.push("product:10");
	keys.push("product:13");
	keys.push("product:35");
	keys.push("product:45");
	keys.push("product:65");
	keys.push("product:80");
	cb.get(keys, null, function(errs, docs, metas) {
		console.log("\n=== get List of documents ===");
		console.log( docs );

	});
	


});
