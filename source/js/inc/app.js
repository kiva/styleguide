'use strict';

require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var imagesizes = require('./app/imagesizes');
var accordion = require('./app/accordion');
var videoResizing = require('./app/videoResizing');
var borrowerPage = require('./app/pages/borrowerPage');
var categories = require('./app/pages/categories');
var lightbox = require('./app/lightbox');
var saveSearchLightbox = require('./app/saveSearchLightbox');
var donationPage = require('./app/pages/donationPage');

var $ = require('jquery');
var FastClick = require('fastclick');

$(document).ready(function() {
	$(document).foundation({
		equalizer: {
			equalize_on_stack: true
		}
		, offcanvas : {
			open_method: 'move'
		}
		, reveal: {
			root_element: '.reveal-modal-bg',
			close_on_background_click: false
		}
		, tooltip: {
			disable_for_touch: true,
			hover_delay: 650
		}
	});

	FastClick.attach(document.body);

	header();
	filters();
	imagesizes();
	accordion();
	videoResizing();
	borrowerPage();
	categories();
	lightbox();
	saveSearchLightbox();
	donationPage();
});
