var $ = require('jquery');

module.exports = function () {
	'use strict';

  //jQuery-Watch-Dom prerequisite (minified)

  (function(n,t){n.fn.watch=function(i){function u(t,i,u){t.each(function(){var i=n(this),t;window.MutationObserver?(t=i.data('__watcherObserver'+r.id),t==null&&(t=new MutationObserver(u.fnc),i.data('__watcherObserver'+r.id,t)),t.observe(this,{attributes:!0,subtree:r.watchChildren,childList:r.watchChildren,characterData:!0})):u.intervalId=setInterval(u.fnc,r.interval)})}function f(i,r,f){var s=n(this),e=s.data(i),a,l,o,h,c;if(e&&(a=this,e.func)){for(l=!1,o=0,o;o<e.props.length;o++)if((h=e.props[o],c='',c=h.startsWith('attr_')?s.attr(h.replace('attr_','')):h.startsWith('prop_')?s.prop(h.replace('prop_','')):s.css(h),c!=t)&&e.vals[o]!=c){e.vals[o]=c;l=!0;break}l&&(s.unwatch(i),e.func.call(a,e,o,r,f),u(s,i,e))}}var r=n.extend({properties:null,interval:100,id:'_watcher_'+(new Date).getTime(),watchChildren:!1,callback:null},i);return this.each(function(){var e=this,i=n(this),o=function(n,t){f.call(e,r.id,n,t)},t={id:r.id,props:r.properties.split(','),vals:[r.properties.split(',').length],func:r.callback,fnc:o,origProps:r.properties,interval:r.interval,intervalId:null};n.each(t.props,function(n){var r=t.props[n];t.vals[n]=t.props[n].startsWith('attr_')?i.attr(r.replace('attr_','')):r.startsWith('prop_')?i.prop(r.replace('props_','')):i.css(r)});i.data(r.id,t);u(i,r.id,t)})};n.fn.unwatch=function(t){return this.each(function(){var i=n(this),u=i.data(t),r;try{window.MutationObserver?(r=i.data('__watcherObserver'+t),r&&(r.disconnect(),i.removeData('__watcherObserver'+t))):clearInterval(u.intervalId)}catch(f){}}),this};String.prototype.startsWith=function(n){return n===null||n===t?!1:n==this.substr(0,n.length)}})(jQuery,undefined);// jshint ignore:line

  //Dom watch function that monitors for changes to the left attribute in the style attribute

  var fifthImage = $('div[data-slick-index="4"]');  //select the 5th image
  var photoCredit = $('#photocredit');              //select the photo credit text
  var photoCreditImage = $('[alt="photocredit"]');  //select the photo credit camera icon
  var styleValues = $('.slick-track');              //select the element to monitor for style changes

  photoCredit.css('visibility','hidden');           //photo credit text and icon hidden on page load
  photoCreditImage.css('visibility','hidden');

  styleValues.watch({                               //add jquery-watch function to monitor for changes
    properties: 'left',                             //to the left attribute in the style attribute of
    callback: function(data,i){                     //of the element with the slick-track class
      var propChanged = data.props[i];
      var newValue = data.vals[i];
      var styleValues = this;
      var styleValues$ = $(this);

      if (fifthImage.hasClass('slick-active')) {    //on each change check to see if the 5th image has
        photoCredit.css('visibility','visible');    // the slick-active class.  If yes show the photo
        photoCreditImage.css('visibility','visible');//credit elements.  If not hide them.
      } else {
        photoCredit.css('visibility','hidden');
        photoCreditImage.css('visibility','hidden');
      }
    }
  });
};
