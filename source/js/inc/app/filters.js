module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');

	if (Foundation.utils.is_medium_up()){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
	}

	if (Foundation.utils.is_small_only()){
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
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

			if ($('#misc-filters-container').height() > 0){
				$('#misc-accordion-selector').trigger('click');
			}

			if ($('#filter-partners-ul').height() > 0){
				$('#partner-accordion-selector').trigger('click');
			}

			if ($('#filter-slider-container').height() > 0){
				$('#slider-accordion-selector').trigger('click');
			}
		}
	});
};
