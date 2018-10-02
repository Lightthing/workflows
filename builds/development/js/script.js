var fill;

(fill = function(item) {
  return $('#tagline').append(`${item}`);
})('The most beautiful city in the world');

fill;

$('h1').each(function(i,el){
	$(this).bind('mouseenter', function(){
		$(this).animate({
			"font-size" : "50px"
		}, 500);
	});
	
	$(this).bind('mouseout', function(){
		$(this).animate({
			"font-size" : "32px"
		}, 2000);
	});
});

$('#content img').each(function(i,el){
	$(this).bind('mouseenter', function(){
		$(this).animate({
			"width" : "100%"
		}, 500);
	});
	
	$(this).bind('mouseout', function(){
		$(this).animate({
			"width" : "70%"
		}, 900);
	});
});
