var driver = require('couchbase');

dbConfiguration = {
	"hosts": ["localhost:8091"],
	"bucket": "node"
};


driver.connect(dbConfiguration, function(err, cb) {
	if (err) {
		throw (err)
	}



	var meetup = {"type" : "meetup", "language" : "javascript"};
	cb.set("barcelonajs",meetup, function(err, meta) {});

	var tmp = {"message" : "hello world!"};
	cb.set("tmp", tmp, {"expiry" : 5},function(err, meta) {});

	cb.set("todelete", tmp, function(err, meta) {});
	cb.remove("todelete", function(err, meta) {});


	


});
