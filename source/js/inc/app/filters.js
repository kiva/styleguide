module.exports = function() {
    'use strict';

    var $ = require('jquery');

	// NoUiSlider
	$('.loan-repayments-slider').noUiSlider({
		start: [ 10, 30 ],
		connect: true,
		range: {
			'min': -20,
			'max': 40
		}
	});
};