var Foundation = require('Foundation');
var $ = require('jquery');

module.exports = function () {
	/* jshint maxstatements: 30 */
	/*jshint maxcomplexity: 15 */

	'use strict';

	var $accordions = $('[data-kv-accordion]');

	var $targets = $($accordions.get().reduce(function(prev, curr, i) {
		return prev + (i===0 ? '' : ', ') + '#' + $(curr).attr('aria-controls');
	}, ''));


	$accordions.click(function() {
		var $this = $(this);
		var $target = $('#'+$this.attr('aria-controls'));
		var is_hidden = $target.attr('aria-hidden') === 'true';

		if(is_hidden) {
			// hide it and measure it
			$target.css({
				visibility: 'hidden'
				, height: 'auto'
			});

			var height = $target.height();

			// show it with no height...
			$target.css({
				visibility: 'visible'
				, height: 0
			});

			// ...and set the height immediately after so it animates
			window.setTimeout(function() {
				$target.css('height', height + 'px');
			}, 0);
		}
		else {
			// if the heihgt hasn't been set yet, measure and set it
			if($target[0].style.height.length === 0 || $target[0].style.height === 'auto') {
				$target.css('height', $target.height() + 'px');
			}

			// set the height to 0 immediately after so it animates
			window.setTimeout(function() {
				$target.css('height', 0);
			}, 0);
		}

		$targets.filter($target.parents()).css('height', 'auto');

		$this.attr('aria-expanded', is_hidden);
		$target.attr('aria-hidden', !is_hidden);
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		if (Foundation.utils.is_medium_up()){
			$('.off-canvas-wrap').foundation('offcanvas', 'show', 'move-right');
		}

		if (Foundation.utils.is_small_only()){
			$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-right');
		}

		// expand all accordions if stepping out of mobile mode
		if (window.matchMedia(Foundation.media_queries.medium).matches || window.matchMedia(Foundation.media_queries.xlarge).matches || window.matchMedia(Foundation.media_queries.xxlarge).matches){
			if ($('#filter-sectors-ul').height() < 1){
				$('#sectors-accordion-selector').trigger('click');
			}

			if ($('#filter-attributes-ul').height() < 1){
				$('#attributes-accordion-selector').trigger('click');
			}

			if ($('#filter-tags-ul').height() < 1){
				$('#tags-accordion-selector').trigger('click');
			}

			if ($('#misc-filters-container').height() < 1){
				$('#misc-accordion-selector').trigger('click');
			}

			if ($('#filter-partners-ul').height() < 1){
				$('#partner-accordion-selector').trigger('click');
			}

			if ($('#filter-slider-container').height() < 1){
				$('#slider-accordion-selector').trigger('click');
			}
		}

		if ($(window).width() < 440){
			if ($('#filter-sectors-ul').height() > 0){
				$('#sectors-accordion-selector').trigger('click');
			}

			if ($('#filter-attributes-ul').height() > 0){
				$('#attributes-accordion-selector').trigger('click');
			}

			if ($('#filter-tags-ul').height() > 0){
				$('#tags-accordion-selector').trigger('click');
			}

			if ($('#misc-filters-container').height() > 0){
				$('#misc-accordion-selector').trigger('click');
			}

			if ($('#filter-partners-ul').height() > 0){
				$('#partner-accordion-selector').trigger('click');
			}

			if ($('#filter-slider-container').height() > 0){
				$('#slider-accordion-selector').trigger('click');
			}
		}

		$targets.each(function() {
			var $this = $(this);
			if($this.height() > 0) {
				$this.css('height', 'auto');
			}
		});
	}, 200));
};