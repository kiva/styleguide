var $ = require('jquery');

module.exports = function () {
    'use strict';

    // for the lenders teams section to expand upon click
    $('.lender-count').click(function () {
        // grab label object
        var teamsLabel = $('#ac-lenders-teams-label');

        // trigger click on label object if it isn't expanded
        if (teamsLabel.attr('aria-expanded') === 'false') {
            teamsLabel.trigger('click');
        }
    });

    $('#show-advanced-toggle, #hide-advanced-toggle').click(function() {
        $('.show-advanced').toggle();
        $('.hide-advanced').toggle();
        $('.simple-repayment-schedule').toggle();
        $('.advanced-repayment-schedule').toggle();
    });
};