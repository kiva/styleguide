module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');

	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if ($('#filter-sectors-ul').height() > 0){
			$('#sectors-accordion-selector').trigger('click');
		}

		if ($('#filter-attributes-ul').height() > 0){
			$('#attributes-accordion-selector').trigger('click');
		}

		if ($('#filter-tags-ul').height() > 0){
			$('#tags-accordion-selector').trigger('click');
		}
	});

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});
};
