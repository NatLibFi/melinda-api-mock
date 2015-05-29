"use strict";

var MockAPI = require('./api-mock');

var api = new MockAPI({
	recordsDir: "records/"
});

var port = 9521;

api.listen(port, function() {
	console.log('melinda-api mock listening in port', port); 
});


