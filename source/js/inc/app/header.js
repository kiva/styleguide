var Foundation = require('Foundation');
var $ = require('jquery');

/* jshint maxstatements: 50 */
module.exports = function () {
	'use strict';
	var $search_toggle = $('#search-toggle');
	var $close_search = $('#close-search');
	var $search_form = $('#search-form');
	var $search_box = $('#search-box');

	$search_toggle.click(function (e) {
		e.preventDefault();

		var expanded = $search_toggle.attr('aria-expanded') === 'false';

		$search_toggle.attr('aria-expanded', expanded);
		$close_search.attr('aria-expanded', expanded);
		$search_form
			.attr('aria-hidden', $search_form.attr('aria-hidden') === 'false')
			.trigger(expanded ? 'show' : 'hide');
	});

	$close_search.click(function (e) {
		e.preventDefault();

		$search_toggle.attr('aria-expanded', false);
		$close_search.attr('aria-expanded', false);
		$search_form
			.attr('aria-hidden', true)
			.trigger('hide');
	});

	var typeahead_menu_repositioning = function() {
		if ($search_box.length) {
			var offset = $search_box.offset();
			$('.top-nav-search-menu').css({
				top: (offset.top + $search_box.outerHeight()) + 'px',
				left: offset.left + 'px',
				width: $search_box.outerWidth() + 'px'
			});
		}
	};

	$search_box.on('typeahead:open', typeahead_menu_repositioning);


	var close_button_visibility = function () {
		$close_search.attr('aria-hidden', Foundation.utils.is_large_up());
	};

	// Initial call
	close_button_visibility();

	// Throttled resize function
	$(window).on('resize', Foundation.utils.throttle(function () {
		close_button_visibility();
		typeahead_menu_repositioning();
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


	// close window when normal links clicked
	$('#lend-dropdown a:not([data-kv-toggle],[href="#"])').click(function () {
		Foundation.libs.dropdown.close($('#lend-dropdown'));
	});

	// Resets lend-menu-large and lend-menu-small
	$('[data-dropdown=lend-dropdown]').click(function (e) {
		e.preventDefault();
		//lend-menu-large
		$category_section.removeClass('slide-left');
		$close_section.attr('aria-hidden', true);
		$tertiary_lists.attr('aria-hidden', true);
		$tertiary_links.attr('aria-expanded', false);

		// lend-menu-small
		$('.lend-menu-small li>a').attr('aria-expanded', false);
		$('.lend-menu-small ul').attr('aria-hidden', true);
	});
};