var $ = require('jquery');

module.exports = function () {
	'use strict';

    $('#show-advanced-toggle, #hide-advanced-toggle').click(function() {
        $('.show-advanced').toggle();
        $('.hide-advanced').toggle();
        $('.simple-repayment-schedule').toggle();
        $('.advanced-repayment-schedule').toggle();
    });

    $('.show-more-lenders').click(function() {
        $('.lenders').append($('.spillover-lenders li').clone(true));

		$('.lenders li a span').lazyload({
			threshold : 200
		});
        $('.show-more-lenders').toggle();
    });

    $('.hide-more-lenders').click(function() {
        $('.show-more-lenders').toggle();
        $('.lenders li:nth-child(n+11)').remove();

		$('html, body').animate({
			scrollTop: $('.lenders-title').offset().top
		}, 1000);
    });

	$('.show-more-teams').click(function() {
		$('.teams').append($('.spillover-teams li').clone(true));

		$('.teams li a span').lazyload({
			threshold : 200
		});
		$('.show-more-teams').toggle();
	});

	$('.hide-more-teams').click(function() {
		$('.show-more-teams').toggle();
		$('.teams li:nth-child(n+11)').remove();

		$('html, body').animate({
			scrollTop: $('.teams-title').offset().top
		}, 1000);
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
};