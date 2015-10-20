module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');

	if (window.matchMedia(Foundation.media_queries.xlarge).matches || window.matchMedia(Foundation.media_queries.xxlarge).matches){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
		$('.filter-menu-button').css('display','none');
	} else {
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
		$('.filter-menu-button').css('display','block');
	}

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});
};
