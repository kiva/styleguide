require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var $ = require('jquery');

$(document).foundation({
	equalizer: {
		equalize_on_stack: true
	}
});

header();
filters();