var Foundation = require('Foundation');
var $ = require('jquery');

module.exports = function () {
	/* jshint maxstatements: 31 */
	/*jshint maxcomplexity: 19 */

	'use strict';

	var $accordions = $('[data-kv-accordion]');

	var $targets = $($accordions.get().reduce(function(prev, curr, i) {
		return prev + (i===0 ? '' : ', ') + '#' + $(curr).attr('aria-controls');
	}, ''));
	
	var linkName = '';

	$('a[href*="#ac-"]').click(function(){ 
		var href = $(this).attr('href');
		var accordionHeader = $(href).parent();
		$('html, body').animate({
        	scrollTop: $(accordionHeader).offset().top
    	}, 1000);
		accordionFunction(href);
	});

	$accordions.click(function() {
		var element = $(this);
		var href = $('#'+element.attr('aria-controls'));
		accordionFunction(href,element);
	});
	
	function accordionFunction(name,element) {
		var $this = element || $(this);
		var $target = $(name);
		var is_hidden = $target.attr('aria-hidden') === 'true';
		var hiding = !is_hidden;

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
				$target.css({
					'height': height + 'px',
					'-webkit-transition': '' // reset fix for iOS bug
				});
			}, 0);
		}
		else {
			// if the height hasn't been set yet, measure and set it
			if($target[0].style.height.length === 0 || $target[0].style.height === 'auto') {
				$target.css('height', $target.height() + 'px');
			}

			// set the height to 0 immediately after so it animates
			window.setTimeout(function() {
				$target.css({
					'height': 0,
					'-webkit-transition': '' // reset fix for iOS bug
				});
			}, 0);
		}

		// set any parent accordions height to auto so that they expand as well
		$targets.filter($target.parents()).css({
			'height': 'auto',
			'-webkit-transition': 'none' // handle iOS safari bug that animates height:auto as height:0
		});

		$this.attr('aria-expanded', !hiding);
		$target.attr('aria-hidden', hiding)
			.trigger(hiding ? 'hide' : 'show');
	}

	$(window).on('resize', Foundation.utils.throttle(function() {
		$targets.each(function() {
			var $this = $(this);
			if($this.attr('aria-hidden') === 'false' && !($('html').hasClass('touch'))) {
				$this.css({
					'height': 'auto',
					'-webkit-transition': 'none' // handle iOS safari bug that animates height:auto as height:0
				});
			}
		});
	}, 200));
};