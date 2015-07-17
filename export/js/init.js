(function(global, $, Foundation){

	//Navigation toggle
	$('.nav-toggle-menu').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.nav').toggleClass('active');
	});
	
	//Navigation toggle
	$('.nav-toggle-search').click(function(e) {
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header .search-form').toggleClass('active');
	});

    // Initialize Foundation
    $(document).foundation();

    // NoUiSlider
    $('.loan-repayments-slider').noUiSlider({
        start: [ 10, 30 ],
        connect: true,
        range: {
            'min': -20,
            'max': 40
        }
    });

	$('[data-kv-toggle]').click(function(e) {
		e.preventDefault();

		var $this = $(this);
		var $target = $('#'+$this.attr('aria-controls'));

		$this.attr('aria-expanded', $this.attr('aria-expanded') === 'false');
		$target.attr('aria-hidden', $target.attr('aria-hidden') === 'false');
	});

	/* Search box JS */

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
		if(Foundation.utils.is_small_only()) {
			$close_search.attr('aria-hidden', false);
		}
		else {
			$close_search.attr('aria-hidden', true);
		}
	}, 200));

})(this, jQuery, Foundation);