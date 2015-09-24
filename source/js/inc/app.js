'use strict';

require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');
var imagesizes = require('./app/imagesizes');
var accordion = require('./app/accordion');
var videoResizing = require('./app/videoResizing');
var borrowerPage = require('./app/pages/borrowerPage');
var $ = require('jquery');

$(document).foundation({
    equalizer: {
        equalize_on_stack: true
    }
});

header();
filters();
imagesizes();
accordion();
videoResizing();
borrowerPage();