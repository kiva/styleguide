var $ = require('jquery');

module.exports = function () {
	'use strict';

	// This is deselecting a radio button if one is selected when user clicks the input field.
	$('#donation-amount-input').click(function() {
		var checked = $('.donation-amount-button').attr('checked', true);
		if(checked){
			$('.donation-amount-button').attr('checked', false);
		}
	});

	// This is clearing the input field if user has entered a value and clicks on a radio button
	$('.donation-amount-button').click(function() {
		if ($('#donation-amount-input').length > 0) {
			$('#donation-amount-input').val('');
		}
	});
};