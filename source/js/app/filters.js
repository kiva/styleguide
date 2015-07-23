var $ = require('jQuery');

module.exports = function() {

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