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


	$accordions.click(function() {
		var $this = $(this);
		var $target = $('#'+$this.attr('aria-controls'));
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

		$this.attr('aria-expanded', !hiding);
		$target.attr('aria-hidden', hiding)
			.trigger(hiding ? 'hide' : 'show');
	});

	$(window).on('resize', Foundation.utils.throttle(function() {
		$targets.each(function() {
			var $this = $(this);
			if($this.height() > 0) {
				$this.css('height', 'auto');
			}
		});
	}, 200));
};