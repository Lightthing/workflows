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
