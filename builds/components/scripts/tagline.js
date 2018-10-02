var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('#tagline').append(`${item}`);
})('The most beautiful city in entire world');

fill;
