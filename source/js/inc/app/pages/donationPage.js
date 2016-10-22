var $ = require('jquery');

module.exports = function () {
	'use strict';

	//Donation amount selection buttons
	//1- I need to have the $50 amount selected upon pageload
	//2- I need to add mouse over and click events to all buttons
	//3- I need to figure out how to do the input field
	//4-

	$( function() {
		$("#donation-buttons").selectable();
	});

	//Donate button
	//1- If monthly donation box is checked: direct user to /about/supportus/monthly
	//   If monthly donation box is not checked: direct user to /basket with donation about selected or entered inside of their basket


};