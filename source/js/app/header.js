var Foundation = require('Foundation');
var Bloodhound = require('bloodhound');

module.exports = function() {
	var $search_toggle = $('#search-toggle');
	var $close_search = $('#close-search');
	var $search_form = $('#search-form');
	var $search_box = $('#search-box');

	$search_toggle.click(function(e) {
		e.preventDefault();

		var expanded = $search_toggle.attr('aria-expanded') === 'false';

		$search_toggle.attr('aria-expanded', expanded);
		$close_search.attr('aria-expanded', expanded);
		$search_form.attr('aria-hidden', $search_form.attr('aria-hidden') === 'false');
	});

	$close_search.click(function(e) {
		e.preventDefault();

		$search_toggle.attr('aria-expanded', false);
		$close_search.attr('aria-expanded', false);
		$search_form.attr('aria-hidden', true);
	});


	var typeahead_menu_repositioning = function() {
		var offset = $search_box.offset();
		$('.top-nav-search-menu').css({
			top: (offset.top + $search_box.outerHeight()) + 'px',
			left: offset.left + 'px',
			width: ($search_box.outerWidth() - 1) + 'px'
		});
	};

	$search_box.on('typeahead:open', typeahead_menu_repositioning);


	var close_button_visibility = function() {
		$close_search.attr('aria-hidden', Foundation.utils.is_large_up());
	};

	// Initial call
	close_button_visibility();

	// Throttled resize function
	$(window).on('resize', Foundation.utils.throttle(function() {
		close_button_visibility();
		typeahead_menu_repositioning();
	}, 200));

	// kv-toggle
	$('[data-kv-toggle]').click(function(e) {
		e.preventDefault();

		var $this = $(this);
		var $target = $('#'+$this.attr('aria-controls'));

		$this.attr('aria-expanded', $this.attr('aria-expanded') === 'false');
		$target.attr('aria-hidden', $target.attr('aria-hidden') === 'false');
	});
};