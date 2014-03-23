http = require("http")
jsdom = require('jsdom')
express = require('express')
app = express()

app.use(express.bodyParser())

list_of_XSS_strings = ["foo", "bar"]

function exploitForm(form, callback){
	// set all inputs to XSS strings
	list_of_XSS_strings.forEach(function(evilstr) {
		form.children.each(function(child){
			child.value = evilstr
		})
	})
	
	// submit the form, store response
	form.post(function(response) {
		// do something with response
		// check for our non-escaped XSS tags
		
		if (stringfound) {
			callback(evilstring, fieldname, form.name)

		}
	})
	// return string that worked
}



app.post("/submit", function(req, res) {
	function finished(evilstring, fieldname, formname) {
		res.end("yay, we found it!", evilstring)
	}

	// config = {}
	// config.document = {}
	// config.document.cookie = "GRUYERE=109040289|hello||author"

	jsdom.env(
	  req.body['url'],
	  ["http://code.jquery.com/jquery.js"],
	  function (errors, window) {
		
		forms = window.$("form")

		forms.forEach(function(form) {
			exploitForm(form, finished)
		})

	  }
	);
});

app.get("/", function(req, res) {
	res.end('<html><form action="/submit" method="POST">Target: <input name="url" /><button>go go go</button></form></html>')
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});