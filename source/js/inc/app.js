require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var imagesizes = require('./app/imagesizes');
var $ = require('jquery');

$(document).foundation({
	equalizer: {
		equalize_on_stack: true
	}
});

header();
filters();
imagesizes();