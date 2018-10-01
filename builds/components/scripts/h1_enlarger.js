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
