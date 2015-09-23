module.exports = function() {
	'use strict';

	var $ = require('jquery');

	// Open Filters By Default
	$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');

	// NoUiSlider
	$('.risk-rating-slider').noUiSlider({
		start: [ 0, 5 ],
		connect: true,
		range: {
			'min': 0,
			'max': 5
		}
	});

	$('.delinquency-rate-slider').noUiSlider({
		start: [ 0, 99 ],
		connect: true,
		range: {
			'min': 0,
			'max': 99
		}
	});

	$('.default-rate-slider').noUiSlider({
		start: [ 0, 99 ],
		connect: true,
		range: {
			'min': 0,
			'max': 99
		}
	});

	$('.borrower-cost-slider').noUiSlider({
		start: [ 0, 99 ],
		connect: true,
		range: {
			'min': 0,
			'max': 99
		}
	});

	$('.profitability-slider').noUiSlider({
		start: [ 0, 99 ],
		connect: true,
		range: {
			'min': 0,
			'max': 99
		}
	});
};