var $ = require('jquery');

module.exports = function () {
	'use strict';

	//Donation amount selection buttons
	//1- DONE I need to have the $50 amount selected upon pageload
	//2- DONE I need to add mouse over and click events to all buttons
	//3- DONE I need to only allow numbers in the input field
	//4- DONE I need to deselect a button when the input is selected.
	//5- 1/2 DONE (need advice moving forward with this one.) I need to add a leading dollar sign in the input box when user enters an amount
	//6- I need to add values to the buttons and input that can be passed through when the Donate button is clicked

	// This is deselecting a radio button if one is selected when user clicks the input field.
	$('#donation-amount-input').click(function() {

		//This only works when the type of the input is not set to type="number", but then the field accepts letter
		//characters, which is not ideal.
		/*
		var text = $('#donation-amount-input');
		text.val('$');
		*/

		var checked = $('.donation-amount-button').attr('checked', true);
		if(checked){
			$('.donation-amount-button').attr('checked', false);
		}
	});

	// This is clearing the input field if user has entered a value and clicks on a radio button
	$('.donation-amount-button').click(function () {
		if ($('#donation-amount-input').val() > 0) {
			$('#donation-amount-input').val('');
		}
	});


	//Donate button
	$('.donate-submit').click(function() {
		if ($('#makeDonationMonthly').is(":checked")) {
			window.location.href = "http://www.kiva.org/about/supportus/monthly";
			console.log("support us page direct");

		} else {
			/*direct user to /basket with donation amount selected or entered inside of their basket*/
			window.location.href = "http://www.kiva.org/basket";
			console.log("basket page direct");
			//need to bring the donation value with me somehow.
		}

	});
};