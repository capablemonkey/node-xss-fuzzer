http = require("http")
jsdom = require('jsdom')

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



function index(req, res) {
	function finished(evilstring, fieldname, formname) {
		res.end("yay, we found it!", evilstring)
	}

	form = ""

	// config = {}
	// config.document = {}
	// config.document.cookie = "GRUYERE=109040289|hello||author"

	jsdom.env(
	  "http://google-gruyere.appspot.com/664058118804/snippets.gtl",
	  ["http://code.jquery.com/jquery.js"],
	  function (errors, window) {
		
		forms = window.$("form")

		forms.forEach(function(form) {
			exploitForm(form, finished)
		})

	  }
	);

}

server = http.createServer(index);

server.listen(3000);