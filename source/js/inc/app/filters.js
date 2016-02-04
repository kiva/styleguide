module.exports = function() {
	'use strict';

	var $ = require('jquery');
	var Foundation = require('Foundation');
	var $partners_filter = $('#partnersFilter');
	var $partners_ul = $('#filter-partners-ul');
	var $expandable_filter_selector = $('.expandable-filter');
	var is_touch = $('html').hasClass('touch');
	var currently_mobile = false;

	// init the multi-select for partners
	$partners_filter.select2({
		templateResult: function(result, container) {
			// add 'needsclick' class to select2 results for iOS/Safari to prevent fastclick from attaching itself
			$(container).addClass('needsclick');
			return result.text;
		}
	});

	// search results may be changing size, so remove any set height caused by kv-accordion
	$partners_filter.on('select2:select select2:unselect', function() {
		if($partners_ul.css('height') !== 'auto') {
			$partners_ul.css('height', 'auto');
		}
	});

	// close the search results when the accordion closes
	$partners_ul.on('hide', function() {
		setTimeout(function(){
			console.log('accordion hid. closing...');
			$partners_filter.select2('close');
		}, 0);
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
		if (is_touch){
			go_mobile();
		}
	});

	// Collapse all accordions if opening up offcanvas
	$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function () {
		if (is_touch || Foundation.utils.is_small_only()){
			go_mobile();
		}
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		if(!is_touch) {
			// expand all accordions if stepping out of mobile mode
			if (currently_mobile && Foundation.utils.is_medium_up()){
				leave_mobile();
			}

			// collapse all accordions if stepping into mobile mode
			if (!currently_mobile && !Foundation.utils.is_medium_up()){
				go_mobile();
			}
		}
	}, 200));
};
