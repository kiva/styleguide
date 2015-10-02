var $ = require('jquery');

module.exports = function () {
    'use strict';

    // for the images in the carousel
    $.each($('.slick-loading-fix'), function(i, v){
        $(v).css('display', 'block');
    });
};