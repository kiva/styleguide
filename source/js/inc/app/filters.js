module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');
	var $expandable_filter_selector = $('.expandable-filter');
	var $partners_filter = $('#partnersFilter');
	var $partners_ul = $('#filter-partners-ul');
	var currently_small = false;

	// init the multi-select for partners
	$partners_filter.select2();
	$partners_filter.on('select2:open', function() {
		$('.select2-dropdown .select2-results__option').addClass('needsclick');
	});
	$partners_filter.on('select2:select select2:unselect', function() {
		if($partners_ul.css('height') !== 'auto') {
			$partners_ul.css('height', 'auto');
		}
	});
	$partners_ul.on('hide', function() {
		$partners_filter.select2('close');
	});

	// If large or higher, show filters
	if (Foundation.utils.is_large_up()){
		$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
	}

	// If small or touch, then hide filters
	if (Foundation.utils.is_small_only() || $('html').hasClass('touch')){
		$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
	}

	// Close accordions if we're on a touch interface
	$(window).load(function() {
		if ($('html').hasClass('touch')){
			$expandable_filter_selector.each(function(){
				var $this = $(this);
				if ($this.attr('aria-expanded') === 'true'){
					$this.trigger('click');
				}
			});
			currently_small = true;
		}
	});

	// Collapse all accordions if opening up offcanvas
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if (Foundation.utils.is_small_only() || $('html').hasClass('touch')){
			$expandable_filter_selector.each(function(){
				var $this = $(this);
				if ($this.attr('aria-expanded') === 'true'){
					$this.trigger('click');
				}
			});
			currently_small = true;
		}
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		// on resize, if canvas closed, open it
		if (Foundation.utils.is_large_up()){
			$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
		}

		// expand all accordions if stepping out of mobile mode
		if (Foundation.utils.is_medium_up() && currently_small && !($('html').hasClass('touch'))){
			$expandable_filter_selector.each(function(){
				var $this = $(this);
				if ($this.attr('aria-expanded') === 'false'){
					$this.trigger('click');
				}
			});
			currently_small = false;
		}

		// collapse all accordions if stepping into mobile mode
		if (Foundation.utils.is_small_only() && !currently_small && !($('html').hasClass('touch'))){
			$expandable_filter_selector.each(function(){
				if ($(this).attr('aria-expanded') === 'true'){
					$(this).trigger('click');
				}
			});
			currently_small = true;
		}
	}, 200));
};
