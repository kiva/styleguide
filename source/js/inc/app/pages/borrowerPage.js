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

    $('.repayment-schedule-wrapper').on('touchstart', function(event){});
};