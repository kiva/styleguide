var $ = require('jquery');

module.exports = function () {
	'use strict';

	//Donation amount selection buttons
	//1- DONE I need to have the $50 amount selected upon pageload
	//2- DONE I need to add mouse over and click events to all buttons
	//3- DONE I need to only allow numbers in the input field
	//4- DONE I need to deselect a button when the input is selected.
	//5- DONE I need to add a leading dollar sign in the input box when user enters an amount
	//6- DONE I need to add values to the buttons and input that can be passed through when the Donate button is clicked

	// This is deselecting a radio button if one is selected when user clicks the input field.
	$('#donation-amount-input').click(function() {
		var checked = $('.donation-amount-button').attr('checked', true);
		if(checked){
			$('.donation-amount-button').attr('checked', false);
		}
		//This adds a leading $ to the input field when user clicks on it.
		var text = $('#donation-amount-input');
		text.val('$');
	});

	// This is clearing the input field if user has entered a value and clicks on a radio button
	$('.donation-amount-button').click(function() {
		if ($('#donation-amount-input').length > 0) {
			$('#donation-amount-input').val('');
			console.log('Input field should have cleared.');
		}
	});


	//Donate button
	$('#donation-form').submit(function(e) {
		e.preventDefault();

		//This is verifying the donation input is a valid currency amount. Commas and decimals are optional.
		var donationValue = document.forms['donation-form']['donation-amount-input'].value;
		var regex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
		if (!donationValue.match(regex)) {
			console.log('Donation amount must be numbers only.');
			//if entered donation amount is not valid, clear the field.
			$('#donation-amount-input').val('');
			return false;
		}

		//This controls where we send the user after clicking the donate button.
		console.log('form submitted.');
		if ($('#makeDonationMonthly').is(':checked')) {
			window.location.href = 'http://www.kiva.org/about/supportus/monthly';
			//need to direct user to the /supportus/monthly page
		} else {
			/*direct user to /basket with donation amount selected or entered inside of their basket*/
			window.location.href = 'http://www.kiva.org/basket';
			//need to direct the user to the basket page and bring the donation value with me.
		}
	});

	//verifying text in donation amount input is numbers
	function checkDonationValid() {
		var donationValue = document.forms['donation-form']['donation-amount-input'].value;
		var regex = /(?=.)^\$?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/;
		console.log('donation value reviewed.');
		if (donationValue.match(regex)) {
			console.log('Donation amount must be numbers only.');
			return false;
		}
	}


	//This is selecting the monthly donation checkbox when a user clicks on the checkbox's label
	var labelID;
	$('.donate-monthly-checkbox').click(function() {
		labelID = $('.donate-monthly-checkbox').attr('for');
		$(labelID).trigger('click');
	});
};