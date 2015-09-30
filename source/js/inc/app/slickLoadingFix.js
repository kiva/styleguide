var $ = require('jquery');

module.exports = function () {
    'use strict';

    // for the accordion toggle
    $.each($('.slick-loading-fix'), function(i, v){
        $(v).css('display', 'block');
    });
};