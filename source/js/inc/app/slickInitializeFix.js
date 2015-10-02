var $ = require('jquery');

module.exports = function () {
    'use strict';

    // Make sure the images load after the page loads
    var loanFigure = $('.loan-figure');

    var $images = loanFigure.find('.loan-image-wrap');
    $images.css('position', 'relative');
    $images.css('opacity', 1);
    setTimeout(function(){
        var slickChildren = loanFigure.find('.slick-list');
        slickChildren.css('position', 'relative');
        slickChildren.css('opacity', 1);
    }, 0)
};