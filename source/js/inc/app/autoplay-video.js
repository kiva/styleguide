  var $ = require('jquery');

module.exports = function () {
	'use strict';

	//Add event handlers to the video play button and video modal close button
  //This adds and removes the autoplay attribute in the video source

  var autoplayYoutubeVideo = $('#autoplayYoutubeVideo');
  var autoplayPlayButton = $('#autoplayPlayButton');
  var autoplayStopButton = $('#autoplayStopButton');
  var url =  autoplayYoutubeVideo.attr('src');
  var control = '&autoplay=1';

  autoplayPlayButton.click(function(){
    autoplayYoutubeVideo.attr('src', url + control);
  });

  autoplayStopButton.click(function(){
    autoplayYoutubeVideo.attr('src', 'src');
  });

};
