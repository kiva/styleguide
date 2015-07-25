var Foundation = require('Foundation');

module.exports = function() {
	var $search_toggle = $('#search-toggle');
	var $close_search = $('#close-search');
	var $search_form = $('#search-form');

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

	// Throttled resize function
	$(window).on('resize', Foundation.utils.throttle(function() {
		if(Foundation.utils.is_large_up()) {
			$close_search.attr('aria-hidden', true);
		}
		else {
			$close_search.attr('aria-hidden', false);
		}
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