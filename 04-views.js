var driver = require('couchbase');

dbConfiguration = {
	"hosts": ["localhost:8091"],
	"bucket": "node"
};

driver.connect(dbConfiguration, function(err, cb) {
	if (err) {
		throw (err)
	}

	var queryParams = {
		stale: false,
		key : "meetup"
	};
	cb.view("my_views", "by_type", queryParams, function(err, view) {
		var keys = new Array();
		for (var i = 0; i < view.length; i++) {
			keys.push(view[i].id);
		}
		cb.get(keys, null, function(errs, docs, metas) {
			console.log(docs);
		});

	});		


});
