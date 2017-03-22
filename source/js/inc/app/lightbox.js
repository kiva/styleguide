module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var $body = $('body');

	//Blocking scrolling on the body of a page when a lightbox opens
	$(document).on('opened.fndtn.reveal', function () {
		$body.css('overflow', 'hidden');
	});

	//Allowing scrolling on the body of a page when a lightbox is closed
	$(document).on('close.fndtn.reveal', function () {
		$body.css('overflow', 'visible');
	});
};