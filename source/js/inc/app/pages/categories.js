var $ = require('jquery');
var Foundation = require('Foundation');

module.exports = function() {
	'use strict';

	var $search_box = $('#category-search-box');

	var search_box_resizing = function() {
		$('.category-search-menu').css('width', $search_box.outerWidth() + 'px');
	};

	$search_box.on('typeahead:open', search_box_resizing);

	// Throttled resize function
	$(window).on('resize', Foundation.utils.throttle(function() {
		search_box_resizing();
	}, 200));
};