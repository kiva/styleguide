module.exports = function() {
	'use strict';

	var $ = require('jquery');

	// init the multi-select for partners
	$('#partnersFilter').select2({
		placeholder: 'Specify a partner'
		, width: 'style'
	});
};
