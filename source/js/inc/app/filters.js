module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});

	// If large or higher, show filters
	if (Foundation.utils.is_large_up()){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
	}

	// If small, then hide filters
	if (Foundation.utils.is_small_only()){
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
	}

	// Collapse all accordions if opening up offcanvas
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if (Foundation.utils.is_small_only()){
			if ($('.expandable-filter').attr('aria-expanded') === 'true'){
				$('.expandable-filter').trigger('click');
			}
		}
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		// on resize, if canvas closed, open it
		if (Foundation.utils.is_large_up()){
			$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
		}

		// expand all accordions if stepping out of mobile mode
		if (Foundation.utils.is_medium_up()){
			if ($('.expandable-filter').attr('aria-expanded') === 'false'){
				$('.expandable-filter').trigger('click');
			}
		}

		// collapse all accordions if stepping into mobile mode
		if (Foundation.utils.is_small_only()){
			if ($('.expandable-filter').attr('aria-expanded') === 'true'){
				$('.expandable-filter').trigger('click');
			}
		}
	}, 200));
};
