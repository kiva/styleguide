var $ = require('jquery');

module.exports = function() {
    'use strict';


    // for the accordion toggle
    $('.ac-input').change(function(){
        $(this).nextAll('.ac-body:first').slideToggle('slow');
    });
};