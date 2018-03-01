var $ = require('jquery');
var WebStorage = require('webstorage');

module.exports = function () {
	'use strict';

	/* Array of collapsible panels on borrower page with default states */
	var COLLAPSIBLE_PANELS = {
		'ac-loan-story-body': 'expanded'
		, 'ac-loan-details-body': 'expanded'
		, 'ac-loan-details-body-right': 'expanded'
		, 'ac-why-special-body': 'expanded'
		, 'ac-field-partner-details-body': 'collapsed'
		, 'ac-field-partner-details-body-right': 'collapsed'
		, 'ac-more-loan-info-body': 'collapsed'
		, 'ac-lenders-teams-body': 'expanded'
		, 'ac-country-info-body': 'collapsed'
		, 'ac-comments-and-updates-body': 'collapsed'
		, 'ac-loan-tags-body': 'collapsed'
		, 'ac-about-zip-body': 'expanded' // direct only
		, 'ac-trustee-info-body': 'collapsed'  // direct only
		, 'ac-trustee-info-body-right': 'collapsed'  // direct only
	}
		, store = new WebStorage('localStorage');

    $('#show-advanced-toggle, #hide-advanced-toggle').on('click', function() {
        $('.show-advanced').toggle();
        $('.hide-advanced').toggle();
        $('.simple-repayment-schedule').toggle();
        $('.advanced-repayment-schedule').toggle();
    });

	$('.show-more-comments').on('click', function() {
		$('.comments').append($('.spillover-comments li').clone(true));
		$('.show-more-comments').toggle();
	});

	$('.hide-more-comments').on('click', function() {
		$('.show-more-comments').toggle();
		$('.comments li:nth-child(n+16)').remove();

		$('html, body').animate({
			scrollTop: $('.show-more-comments').offset().top
		}, 1000);
	});

	$('.show-previous-loan-details').on('click', function() {
		$('.show-previous-loan-details').toggle();
	});

	$('.hide-previous-loan-details').on('click', function() {
		$('.show-previous-loan-details').toggle();
		$('html, body').animate({
			scrollTop: $('.loan-story').offset().top
		}, 1000);
	});

	$('.show-all-previous-loan-details').on('click', function() {
		$('.show-all-previous-loan-details').toggle();
	});

	// button to reveal or hide the loan tag options
	var tagToggler = $('.tag-toggler');
	tagToggler.on('click', function () {
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

	$('.borrower-profile-wrapper .lender-count').on('click', function(){
		var lendersAccordion = $('[aria-controls="ac-lenders-teams-body"]');
		if (lendersAccordion.attr('aria-expanded') === 'false'){
			lendersAccordion.click();
		}
	});

	$('.borrower-profile-wrapper .country-text a').on('click', function(){
		var countryAccordion = $('[aria-controls="ac-country-info-body"]');
		if (countryAccordion.attr('aria-expanded') === 'false'){
			countryAccordion.click();
		}
	});

	/* handle clicks that expand or collapse content panels  */
	$('.ac-title').on('click', function(event){
		if (event.hasOwnProperty('originalEvent')) {
			// we only want to respond to actual user clicks
			var panel = $(this).attr('aria-controls')
				, panelState = $(this).attr('aria-expanded') === 'true' ? 'collapsed':'expanded';
				// seems backward because 'aria-expanded' is evaluated before click takes effect

			updatePanelStates(panel, panelState);
		}
	});

	/* when a panel is expanded or collapsed, if new state is not default state
	 * then record new state in local storage to make it sticky */
	function updatePanelStates(panel, panelState) {
		var panelStates = {}
			, storedPanelStates = store.get('borrowerPanelStates') || {};

		if (Object.keys(storedPanelStates).length) {
			panelStates = storedPanelStates;
		}

		if(panel in COLLAPSIBLE_PANELS) {
			if (COLLAPSIBLE_PANELS[panel] !== panelState) {
				panelStates[panel] = panelState;
			} else {
				delete panelStates[panel];
			}
			store.set('borrowerPanelStates', panelStates);
		}
	}
};
