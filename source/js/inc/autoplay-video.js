  var $ = require('jquery');

module.exports = function () {
	'use strict';

	//Add event handlers to the video play button and video modal close button
  //This adds and removes the autoplay attribute in the video source

  var kivaLabsYoutubeVideo = $('#kivalabsYoutubeVideo');
  var kivaLabsPlayButton = $('#kivalabsPlayButton');
  var kivaLabsStopButton = $('#kivalabsStopButton');

  kivaLabsPlayButton.click(function(){
    kivaLabsYoutubeVideo.attr('src', 'http://www.youtube.com/embed/v2vetkuQivw?controls=0&autoplay=1');
  });

  kivaLabsStopButton.click(function(){
    kivaLabsYoutubeVideo.attr('src', 'http://www.youtube.com/embed/v2vetkuQivw?controls=0');
  });

};
