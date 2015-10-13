module.exports = function() {
	'use strict';

	var $ = require('jquery');

	// Open Filters By Default
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});
};
