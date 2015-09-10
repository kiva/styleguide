var $ = require('jquery');

module.exports = function() {
	'use strict';

	// override default Foundation image size shortcuts
	// and add retina shortcuts for multiple sizes
	// note that Foundation js assumes 1em=16px despite www scss setting of 18px
	$(document).foundation('interchange', {
		named_queries: {
			'small-only': 'only screen and (max-width: 30em)' /* 0, 480px */
			,
			'medium': 'only screen and (min-width: 30.0625em)' /* 481px */
			,
			'medium-only': 'only screen and (min-width: 30.0625em) and (max-width: 42.5em)' /* 481px, 680px */
			,
			'large': 'only screen and (min-width: 42.5625em)' /* 681px */
			,
			'large-only': 'only screen and (min-width: 42.5625em) and (max-width: 64em)' /* 681px, 1024px */
			,
			'xlarge': 'only screen and (min-width: 64.0625em)' /* 1025px */
			,
			'xlarge-only': 'only screen and (min-width: 64.0625em) and (max-width: 90em)' /* 1024px, 1440px */
			,
			'xxlarge': 'only screen and (min-width: 90.0625em)' /* 1441px */
			,
			'small-only-retina': 'only screen and (max-width: 30em) and (-webkit-min-device-pixel-ratio: 2)' /* 0, 480px */
			,
			'medium-retina': 'only screen and (min-width: 30.0625em) and (-webkit-min-device-pixel-ratio: 2)' /* 481px */
			,
			'medium-only-retina': 'only screen and (min-width: 30.0625em) and (max-width: 42.5em) and (-webkit-min-device-pixel-ratio: 2)' /* 481px, 680px */
			,
			'large-retina': 'only screen and (min-width: 42.5625em) and (-webkit-min-device-pixel-ratio: 2)' /* 681px */
			,
			'large-only-retina': 'only screen and (min-width: 42.5625em) and (max-width: 64em) and (-webkit-min-device-pixel-ratio: 2)' /* 681px, 1024px */
			,
			'xlarge-retina': 'only screen and (min-width: 64.0625em) and (-webkit-min-device-pixel-ratio: 2)' /* 1025px */
			,
			'xlarge-only-retina': 'only screen and (min-width: 64.0625em) and (max-width: 90em) and (-webkit-min-device-pixel-ratio: 2)' /* 1024px, 1440px */
			,
			'xxlarge-retina': 'only screen and (min-width: 90.0625em) and (-webkit-min-device-pixel-ratio: 2)' /* 1441px */
		}
	});

};