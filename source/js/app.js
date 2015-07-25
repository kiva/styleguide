require('./vendor');

var header = require('./app/header');
var filters = require('./app/filters');

$(document).foundation();

header();
filters();