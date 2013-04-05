var driver = require('couchbase');

dbConfiguration = {
	"hosts": ["localhost:8091"],
	"bucket": "node"
};


driver.connect(dbConfiguration, function(err, cb) {
	if (err) {
		throw (err)
	}




    function initApplication() {
		console.log("-- Init Application ---")
				console.log("\t Installing views");

				var ddoc = {
					"views": {
						"by_type": {
							"map": "function (doc, meta) { \n"
							+"  if (doc.type) { \n"
							+"    emit(doc.type); \n"
							+"  }\n"
							+"}\n"
						}
					}
				};
				cb.createDesignDoc('my_views', ddoc, function(err, resp, data) { 
				});
    }

	initApplication();

	


});
