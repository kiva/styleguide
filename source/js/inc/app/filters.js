module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');
	var $partners_filter = $('#partnersFilter');
	var $partners_ul = $('#filter-partners-ul');
	var $expandable_filter_selector = $('.expandable-filter');
	var currently_mobile = false;

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


	var _click_accordions_if = function(condition) {
		$expandable_filter_selector.each(function(){
			var $this = $(this);
			if ($this.attr('aria-expanded') === condition){
				$this.trigger('click');
			}
		});
	};

	var go_mobile = function() {
		_click_accordions_if('true');
		currently_mobile = true;
	};

	var leave_mobile = function() {
		_click_accordions_if('false');
		currently_mobile = false;
	};


	// Close accordions if we're on a touch interface
	$(window).load(function() {
		if ($('html').hasClass('touch')){
			go_mobile();
		}
	});

	// Collapse all accordions if opening up offcanvas
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if (Foundation.utils.is_small_only() || $('html').hasClass('touch')){
			go_mobile();
		}
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		// expand all accordions if stepping out of mobile mode
		if (Foundation.utils.is_medium_up() && currently_mobile && !($('html').hasClass('touch'))){
			leave_mobile();
		}

		// collapse all accordions if stepping into mobile mode
		if (Foundation.utils.is_small_only() && !currently_mobile && !($('html').hasClass('touch'))){
			go_mobile();
		}
	}, 200));
};
