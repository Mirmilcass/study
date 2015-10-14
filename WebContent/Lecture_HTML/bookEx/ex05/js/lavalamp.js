(function($) {
	$(function() {

		var $nav = $('#navigation'), $current_item = $nav.find('.focus'), $lava = $('<li class="lava"/>');

		options = {
			gap : 20,
			speed : 400,
			easing : 'easeInOutElastion',
			reset : 2000
		};
		
		$nav.css('position', 'relative').find('a').css({
			position : 'relative',
			zIndex : 1
		});

		$lava.css({
//			Position : 'absolute',
//			
//			top : $current_item.position().top,
//			left : $current_item.position().left,
//			
			width : $current_item.outerWidth(),
			height : $current_item.outerHeight(),
									
			backgroundColor : '#eee'
			
		}).appendTo($nav.find('ul'));

		// $nav.find('li').bind('mouseover focusin', function() {
		// clearTimeout(reset);
		// $lava.aniamate({
		// left : $(this).position().left,
		// width : $(this).outerWidth()
		// }, {
		// duration : options.speed,
		// eastion : options.easing,
		// queue : false
		// });
		// }).bind('mouseout focustout', function() {
		// reset = setTimeout(function() {
		// $lava.animate({
		//
		// left : $current_item.position().left,
		// width : $current_item.outerWidth()
		// }, options.speed);
		// }, options.reset);
		// });

	});

})(jQuery);
