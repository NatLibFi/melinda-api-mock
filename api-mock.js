/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file. 
 *
 * A mock of Melinda API
 *
 * Copyright (c) 2015, 2017 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of melinda-api-mock
 *
 * melinda-api-mock is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * melinda-api-mock is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.	See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 **/
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