var $ = require('jquery');

module.exports = function () {
	'use strict';
	
	$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
		var saveSearchInput = $('#save-search-text');
		if (saveSearchInput.length) {
			saveSearchInput.focus();
		}
	});
};