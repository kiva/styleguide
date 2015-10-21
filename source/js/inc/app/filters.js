module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');

	if (Foundation.utils.is_medium_up()){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
		$('#filter-menu-button').css('visibility','hidden');
	}

	if (Foundation.utils.is_small_only()){
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
		$('#filter-menu-button').css('visibility','initial');
	}

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});

	// collapse all accordions if opening up offcanvas
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if ($(window).width() < 440){
			if ($('#filter-sectors-ul').height() > 0){
				$('#sectors-accordion-selector').trigger('click');
			}

			if ($('#filter-attributes-ul').height() > 0){
				$('#attributes-accordion-selector').trigger('click');
			}

			if ($('#filter-tags-ul').height() > 0){
				$('#tags-accordion-selector').trigger('click');
			}
		}
	});
};
