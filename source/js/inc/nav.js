require('./vendor');

var header = require('./app/header');
var accordion = require('./app/accordion');
var $ = require('jquery');

$(document).foundation();

header();
accordion();