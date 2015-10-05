var $ = require('jquery');

module.exports = function () {
	'use strict';

	// override default Foundation image size shortcuts
	// and add retina shortcuts for multiple sizes
	// note that Foundation js assumes 1em=16px despite www scss setting of 18px
	$(document).foundation('interchange', {
		named_queries: {
			'small-only': 'only screen and (max-width: 480px)' /* 0, 480px */
			,
			'medium': 'only screen and (min-width: 481px)' /* 481px */
			,
			'medium-only': 'only screen and (min-width: 481px) and (max-width: 680px)' /* 481px, 680px */
			,
			'large': 'only screen and (min-width: 681px)' /* 681px */
			,
			'large-only': 'only screen and (min-width: 681px) and (max-width: 1024px)' /* 681px, 1024px */
			,
			'xlarge': 'only screen and (min-width: 1025px)' /* 1025px */
			,
			'xlarge-only': 'only screen and (min-width: 1025px) and (max-width: 1440px)' /* 1024px, 1440px */
			,
			'xxlarge': 'only screen and (min-width: 1441px)' /* 1441px */
			,
			'small-only-retina': 'only screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 2)'
			+ ', only screen and (max-width: 480px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (max-width: 480px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (max-width: 480px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (max-width: 480px) and (min-resolution: 192dpi)'
			+ ', only screen and (max-width: 480px) and (min-resolution: 192dpi)'
			+ ', only screen and (max-width: 480px) and ((min - resolution: 2dppx)'
			,
			'medium-retina': 'only screen and ((min-width: 481px) and (-webkit-min-device-pixel-ratio: 2)' /* 481px */
			+ ', only screen and (min-width: 481px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 481px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 481px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 481px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 481px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 481px) and ((min - resolution: 2dppx)'
			,
			'medium-only-retina': 'only screen and (min-width: 481px) and (max-width: 680px) and (-webkit-min-device-pixel-ratio: 2)' /* 481px, 680px */
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 481px) and (max-width: 680px) and ((min - resolution: 2dppx)'
			,
			'large-retina': 'only screen and (min-width: 681px) and (-webkit-min-device-pixel-ratio: 2)' /* 681px */
			+ ', only screen and (min-width: 681px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 681px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 681px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 681px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 681px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 681px) and ((min - resolution: 2dppx)'
			,
			'large-only-retina': 'only screen and (min-width: 681px) and (max-width: 1024px) and (-webkit-min-device-pixel-ratio: 2)' /* 681px, 1024px */
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 681px) and (max-width: 1024px) and ((min - resolution: 2dppx)'
			,
			'xlarge-retina': 'only screen and (min-width: 1025px) and (-webkit-min-device-pixel-ratio: 2)' /* 1025px */
			+ ', only screen and (min-width: 1025px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1025px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 1025px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1025px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1025px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1025px) and ((min - resolution: 2dppx)'
			,
			'xlarge-only-retina': 'only screen and (min-width: 1025px) and (max-width: 1440px) and (-webkit-min-device-pixel-ratio: 2)' /* 1024px, 1440px */
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1025px) and (max-width: 1440px) and ((min - resolution: 2dppx)'
			,
			'xxlarge-retina': 'only screen and (min-width: 1441px) and (-webkit-min-device-pixel-ratio: 2)' /* 1441px */
			+ ', only screen and (min-width: 1441px) and (min--moz-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1441px) and (-o-min-device-pixel-ratio: 2/1)'
			+ ', only screen and (min-width: 1441px) and (min-device-pixel-ratio: 2)'
			+ ', only screen and (min-width: 1441px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1441px) and (min-resolution: 192dpi)'
			+ ', only screen and (min-width: 1441px) and ((min - resolution: 2dppx)'
		}
	});

};
