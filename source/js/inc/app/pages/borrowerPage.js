var $ = require('jquery');

module.exports = function () {
    'use strict';

    // for the lenders teams section to expand upon click
    $('.lender-count').click(function () {
        var teamMolecule = $('#ac-lenders-teams');
        if (!teamMolecule.prop('checked')) {
            teamMolecule.prop('checked', true);
            teamMolecule.nextAll('.ac-body:first').slideToggle('slow');
        }
    });
};