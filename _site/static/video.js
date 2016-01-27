
$(function() {
	
	// sometimes HTML5 videos in the slideshow don't autoplay when we want them to.

	$("video.autoplay").each(function() {
		this.play();
	});

	// In browsers where autoplay doesn't work, we render our own play button overlay.
	// In particular, Chrome on Android has this issue.

	var checkVideoStatus = function(video, button) {
		
		if (video.paused) {
			button.show();
		} else {
			button.hide();
		}

		setTimeout(checkVideoStatus.bind(null, video, button), 100);

	};

	var playButtonClick = function(video, button) {
		video.play();
		button.hide();
	};

	$("video").each(function() {

		var parent = $(this).parent();
		if (!parent.hasClass("video_container")) return;

		var button = $("<button>")
			.addClass("video_play_button")
			.click(playButtonClick.bind(null, this, button))
			.appendTo(parent)
			.hide();
		
		setTimeout(checkVideoStatus.bind(null, this, button), 100);

	});

});
