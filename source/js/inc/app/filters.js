module.exports = function() {
	'use strict';

	var $ = require('jquery');

	// Open Filters By Default
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
	//$('.off-canvas-wrap').foundation('offcanvas', 'show', 'offcanvas-overlap-right');

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});
};
