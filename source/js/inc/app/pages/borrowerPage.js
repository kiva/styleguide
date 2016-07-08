var $ = require('jquery');

module.exports = function () {
	'use strict';

    $('#show-advanced-toggle, #hide-advanced-toggle').click(function() {
        $('.show-advanced').toggle();
        $('.hide-advanced').toggle();
        $('.simple-repayment-schedule').toggle();
        $('.advanced-repayment-schedule').toggle();
    });

	$('.show-more-comments').click(function() {
		$('.comments').append($('.spillover-comments li').clone(true));
		$('.show-more-comments').toggle();
	});

	$('.hide-more-comments').click(function() {
		$('.show-more-comments').toggle();
		$('.comments li:nth-child(n+16)').remove();

		$('html, body').animate({
			scrollTop: $('.show-more-comments').offset().top
		}, 1000);
	});

	$('.show-previous-loan-details').click(function() {
		$('.show-previous-loan-details').toggle();
	});

	$('.hide-previous-loan-details').click(function() {
		$('.show-previous-loan-details').toggle();
		$('html, body').animate({
			scrollTop: $('.loan-story').offset().top
		}, 1000);
	});

	$('.show-all-previous-loan-details').click(function() {
		$('.show-all-previous-loan-details').toggle();
	});

	// button to reveal or hide the loan tag options
	var tagToggler = $('.tag-toggler');
	tagToggler.click(function () {
		$('.tag-directions').toggle();
		var allTags = $('.all-tags');
		if (tagToggler.text() != 'Close') {
			tagToggler.text('Close');
			allTags.css('height', 'auto');
			$('#ac-loan-tags-body').css('height', 'auto');
		}
		else if ($('.selected-tags').children().size() > 0) {
			tagToggler.text('Add more tags');
			allTags.css('height', 0);
		}
		else {
			tagToggler.text('Add tags');
			allTags.css('height', 0);
		}
	});

	$('.borrower-profile-wrapper .lender-count').click(function(){
		var lendersAccordion = $('[aria-controls="ac-lenders-teams-body"]');
		if (lendersAccordion.attr('aria-expanded') === 'false'){
			lendersAccordion.click();
		}
	});

	$('.borrower-profile-wrapper .country-text a').click(function(){
		var countryAccordion = $('[aria-controls="ac-country-info-body"]');
		if (countryAccordion.attr('aria-expanded') === 'false'){
			countryAccordion.click();
		}
	});
};