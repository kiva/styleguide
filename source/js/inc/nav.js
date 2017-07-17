/* global Foundation */

'use strict';

require('./nav-only-vendor');

var header = require('./app/header');
var accordion = require('./app/accordion');
var $ = require('jquery');

$(document).ready(function () {
	Foundation.global.namespace = ''; // WEBBUG-2494 foundation borks sometimes if the namespace is undefined
	$(document).foundation();

	header();
	accordion();
});