/* jshint node:true */
"use strict";

var http = require('http');
var url = require('url');
var fs = require('fs');

function constructor(config) {

	var server = http.createServer(function (req, res) {

		var url_parts = url.parse(req.url, true);
		console.log(url_parts);
		var action = url_parts.path.split("/");
		if (action[1] === "bib") {
			var requestedId = action[2];
			
			var id = parseInt(requestedId);
			console.log(requestedId, "->", id);

			try {
				var response = fs.readFileSync(config.recordsDir + id + ".xml", 'utf8');
				res.writeHead(200, {'Content-Type': 'text/xml'});
				res.end(response);
			} catch(e) {
				if (e.code == 'ENOENT') {
					res.writeHead(404);
					res.end();
				} else {
					console.log(e);
					res.writeHead(500);
					res.end();
				}
			}
			return;
		} 
		console.log("Bad request");
		res.writeHead(400);
		res.end();
		

	});

	return server;
}

module.exports = constructor;