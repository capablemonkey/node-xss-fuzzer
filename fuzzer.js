http = require("http")
jsdom = require('jsdom')

function index(req, res) {
	form = ""

	jsdom.env(
	  "http://www.google.com/",
	  ["http://code.jquery.com/jquery.js"],
	  function (errors, window) {
	    window.$("form");
	  }
	);

	res.end("lol")
}

server = http.createServer(index);

server.listen(3000);