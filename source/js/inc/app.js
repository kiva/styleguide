'use strict';

require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var imagesizes = require('./app/imagesizes');
var accordion = require('./app/accordion');
var videoResizing = require('./app/videoResizing');
var borrowerPage = require('./app/pages/borrowerPage');
var categories = require('./app/pages/categories');

var $ = require('jquery');
var FastClick = require('fastclick');

$(document).foundation({
	equalizer: {
		equalize_on_stack: true
	}
	, offcanvas : {
		open_method: 'move'
	}
	, reveal: {
		root_element: '.reveal-modal-bg'
	}
});

//Blocking scrolling on the body of a page when a lightbox opens
$(document).on('open.fndtn.reveal', '[data-reveal]', function () {
	$('body').css('overflow', 'hidden');
});

//Allowing scrolling on the body of a page when a lightbox is closed
$(document).on('close.fndtn.reveal', '[data-reveal]', function () {
	$('body').css('overflow', 'auto');
});

FastClick.attach(document.body);

header();
filters();
imagesizes();
accordion();
videoResizing();
borrowerPage();
categories();
