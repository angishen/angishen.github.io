
$(function() {
	
	//if there's only one item, don't make a slideshow
	if ($(".slideshow > *").length <= 1)
		return;

	$(".slideshow").slidesjs({
		"width": 780,
		"height": 400
	});

});