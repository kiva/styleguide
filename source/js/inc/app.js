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

$('.ac-input').change(function(){
	$(this).nextAll('.ac-body:first').slideToggle('slow');
});

header();
filters();
imagesizes();