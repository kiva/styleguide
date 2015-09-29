var $ = require('jquery');

module.exports = function () {
    'use strict';

	$('[data-kv-accordion]').click(function() {
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

		$target.parents('[data-kv-accordion] + *').css('height', 'auto');

		$this.attr('aria-expanded', is_hidden);
		$target.attr('aria-hidden', !is_hidden);
	});
};