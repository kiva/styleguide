(function(global, $){

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

	//kv-dropdown
	$('a[data-kv-dropdown]').click(function() {
		var $this = $(this);
		$('#'+$this.data('kv-dropdown')).toggleClass('open');
		$this.attr('aria-expanded', $this.attr('aria-expanded') !== 'true');
	});

})(this, jQuery);