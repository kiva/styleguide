'use strict';

require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var imagesizes = require('./app/imagesizes');
var accordion = require('./app/accordion');
var videoResizing = require('./app/videoResizing');
var borrowerPage = require('./app/pages/borrowerPage');
var categories = require('./app/pages/categories');
var lightbox = require('./app/lightbox');
var saveSearchLightbox = require('./app/saveSearchLightbox');
var donationPage = require('./app/pages/donationPage');

var $ = require('jquery');
var FastClick = require('fastclick');
var numeral = require('numeral');

$(document).ready(function () {
	$(document).foundation({
		abide: {
			live_validate: false
			, timeout: 0
			, validators: {
				currency: function (el, required) {
					if (el.value.length > 0) {
						var validFormat = /^\$?\d{1,3}(?:,?\d{3})*(?:\.\d{1,2})?$/.test(el.value),
							amount = numeral(el.value).value(),
							min = numeral(el.getAttribute('data-min-amount')).value(),
							max = numeral(el.getAttribute('data-max-amount')).value();

						min = min === null ? amount : min; // in case of null, set to amount so it will pass
						max = max === null ? amount : max; // in case of null, set to amount so it will pass

						return validFormat && amount >= min && amount <= max;
					}
					else {
						return !required;
					}
				},
				ordinalDayOfMonth: function (el, required) {
					if (el.value.length > 0) {
						var validFormat = /[0-9][0-9]?[SsNnRrTt]?[TtDdHh]?/.test(el.value),
							amount = numeral(el.value).value(),
							min = numeral(el.getAttribute('data-min-day')).value(),
							max = numeral(el.getAttribute('data-max-day')).value();

						min = min === null ? amount : min; // in case of null, set to amount so it will pass
						max = max === null ? amount : max; // in case of null, set to amount so it will pass

						return validFormat && amount >= min && amount <= max;
					}
					else {
						return !required;
					}
				}
			}
		}
		, accordion: {
			// allow multiple accordion panels to be active at the same time
			multi_expand: true,
			// allow accordion panels to be closed by clicking on their headers
			// setting to false only closes accordion panels when another is opened
			toggleable: true
		}
		, equalizer: {
			equalize_on_stack: true
		}
		, offcanvas: {
			open_method: 'move'
		}
		, reveal: {
			root_element: '.reveal-modal-bg',
			close_on_background_click: false
		}
		, tooltip: {
			disable_for_touch: true,
			hover_delay: 650
		}
	});

	FastClick.attach(document.body);

	header();
	filters();
	imagesizes();
	accordion();
	videoResizing();
	borrowerPage();
	categories();
	lightbox();
	saveSearchLightbox();
	donationPage();
});