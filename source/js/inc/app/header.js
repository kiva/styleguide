var Foundation = require('Foundation');
var $ = require('jquery');

/* jshint maxstatements: 50 */
module.exports = function () {
	'use strict';
	var $search_toggle = $('#search-toggle');
	var $close_search = $('#close-search');
	var $search_form = $('#search-form');
	var $search_box = $('#search-box');
	var is_touch = $('html').hasClass('touch');
	var $top_nav = $('.top-nav');
	var $has_basket = !$('#top-basket-button').hasClass('hide');

	$search_toggle.click(function (e) {
		e.preventDefault();

		if (Foundation.utils.is_small_only() || Foundation.utils.is_large_only() || ($has_basket && Foundation.utils.is_xlarge_only())) {
			var expanded = $search_toggle.attr('aria-expanded') === 'false';

			$search_toggle.attr('aria-expanded', expanded);
			$close_search.attr('aria-expanded', expanded);
			$search_form
				.attr('aria-hidden', $search_form.attr('aria-hidden') === 'false')
				.trigger(expanded ? 'show' : 'hide');
		} else {
			$search_toggle.attr('aria-expanded', true);
			$search_form
				.attr('aria-hidden', false)
				.trigger('show');
		}
	});

	$close_search.click(function (e) {
		e.preventDefault();

		if (Foundation.utils.is_small_only() || Foundation.utils.is_large_only() || ($has_basket && Foundation.utils.is_xlarge_only())) {
			$search_toggle.attr('aria-expanded', false);
			$close_search.attr('aria-expanded', false);
			$search_form
				.attr('aria-hidden', true)
				.trigger('hide');
		}
	});

	var typeahead_menu_repositioning = function() {
		if ($search_box.length) {
			var searchBoxOffset = $search_box.offset();
			var topNavOffset = $top_nav.offset();
			$('.top-nav-search-menu').css({
				top: (searchBoxOffset.top - topNavOffset.top + $search_box.outerHeight()) + 'px',
				left: searchBoxOffset.left + 'px',
				width: $search_box.outerWidth() + 'px'
			});
		}
	};

	// REDO-1768: For some reason this event fires inconsistently across different pages.
	// As a workaround, let's re-run the repositioning a second time when the open animation finishes
	$search_box.on('typeahead:open', function() {
		typeahead_menu_repositioning();

		window.setTimeout(typeahead_menu_repositioning, 500);
	});


	var close_button_visibility = function () {
		$close_search.attr('aria-hidden', Foundation.utils.is_small_only() || Foundation.utils.is_large_only() || ($has_basket && Foundation.utils.is_xlarge_only()));
	};

	// Initial call
	close_button_visibility();

	var mobile_search_visibility = function () {
		$search_form.attr('aria-hidden', Foundation.utils.is_small_only() || Foundation.utils.is_large_only() || ($has_basket && Foundation.utils.is_xlarge_only()));
	};

	// Initial call
	mobile_search_visibility();

	// Throttled resize function
	$(window).on('resize', Foundation.utils.throttle(function () {
		close_button_visibility();
		typeahead_menu_repositioning();
		mobile_search_visibility();
	}, 200));


	// Lend Mega-Menu
	var $category_section = $('.lend-menu-large > div:first-child');
	var $close_section = $('.lend-menu-large .close-section');
	var $tertiary_links = $('.lend-menu-large .tertiary-link');
	var $tertiary_lists = $('.lend-menu-large .tertiary-list');

	$close_section.click(function (e) {
		e.preventDefault();

		$tertiary_links.attr('aria-expanded', false);
		$tertiary_lists.attr('aria-hidden', true);

		$category_section.removeClass('slide-left');
		$close_section.attr('aria-hidden', true);
	});

	$('.lend-menu-large [data-kv-toggle]').click(function (e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.attr('aria-expanded') === 'true') {
			$category_section.removeClass('slide-left');
			$close_section.attr('aria-hidden', true);
		}
		else {
			$tertiary_links.attr('aria-expanded', false);
			$tertiary_lists.attr('aria-hidden', true);

			$category_section.addClass('slide-left');
			$close_section.attr('aria-hidden', false);
		}
	});


	// kv-toggle
	$('[data-kv-toggle]').click(function (e) {
		e.preventDefault();

		var $this = $(this);
		var $target = $('#' + $this.attr('aria-controls'));
		var hidden = $target.attr('aria-hidden') === 'false';

		$this.attr('aria-expanded', $this.attr('aria-expanded') === 'false');
		$target
			.attr('aria-hidden', hidden)
			.trigger(hidden ? 'hide' : 'show');
	});

	// when not touchscreen, close lend dropdown when lend button itself is clicked
	if (! is_touch) {
		$('[data-dropdown="lend-dropdown"]').click(function () {
			Foundation.libs.dropdown.close($('#lend-dropdown'));
		});
	}

	// close window when normal links clicked
	$('#lend-dropdown a:not([data-kv-toggle],[href="#"])').click(function () {
		Foundation.libs.dropdown.close($('#lend-dropdown'));
	});

	// Resets lend-menu-large and lend-menu-small
	$('#lend-dropdown').on('closed.fndtn.dropdown', function () {
		//lend-menu-large
		$category_section.removeClass('slide-left');
		$close_section.attr('aria-hidden', true);
		$tertiary_lists.attr('aria-hidden', true);
		$tertiary_links.attr('aria-expanded', false);

		// lend-menu-small
		$('.lend-menu-small li>a').attr('aria-expanded', false);
		$('.lend-menu-small ul').attr('aria-hidden', true).css('height', 0);
	});

	// when not touchscreen, close about dropdown when about button itself is clicked
	if (! is_touch) {
		$('[data-dropdown="about-dropdown"]').click(function () {
			Foundation.libs.dropdown.close($('#about-dropdown'));
		});
	}

	// when not touchscreen, close my-kiva dropdown when my-kiva button itself is clicked
	if (! is_touch) {
		$('[data-dropdown="my-kiva-dropdown"]').click(function () {
			Foundation.libs.dropdown.close($('#my-kiva-dropdown'));
		});
	}
};
