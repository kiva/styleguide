var $ = require('jquery');

module.exports = function () {
	'use strict';

	// for the lenders teams section to expand upon click
	$('.lender-count').click(function () {
		// grab label object
		var teamsLabel = $('#ac-lenders-teams-label');

		// trigger click on label object if it isn't expanded
		if (teamsLabel.attr('aria-expanded') === 'false') {
			teamsLabel.trigger('click');
		}
	});

    $('#show-advanced-toggle, #hide-advanced-toggle').click(function() {
        $('.show-advanced').toggle();
        $('.hide-advanced').toggle();
        $('.simple-repayment-schedule').toggle();
        $('.advanced-repayment-schedule').toggle();
    });

    $('.show-more-lenders-teams').click(function() {
        $('.lenders').append($('.spillover-lenders li').clone(true));
        $('.show-more-lenders-teams').toggle();
    });

    $('.hide-more-lenders-teams').click(function() {
        $('.show-more-lenders-teams').toggle();
        $('.lenders li:nth-child(n+11)').remove();
    });

	// button to reveal or hide the loan tag options
	var tagToggler = $('.tag-toggler');
	tagToggler.click(function () {
		$('.tag-directions').toggle();
		$('.all-tags').toggle();
		if (tagToggler.text() != 'Close') {
			tagToggler.text('Close');
		}
		else if ($('.selected-tags').children().size() > 0) {
			tagToggler.text('Add more tags');
		}
		else {
			tagToggler.text('Add tags');
		}
	});
};