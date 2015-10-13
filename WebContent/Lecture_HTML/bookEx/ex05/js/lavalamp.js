(function($) {
	$(function() {

		var $nav = $('#navigation'), 
		$current_item = $nav.find('.focus'), 
		$lava = $('<li class="lava"/>');
		$lava.appendTo($nav.find('ul'));

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
//		$nav.find('li').bind('mouseover focusin', function() {
//			clearTimeout(reset);
//			$lava.aniamate({
//				left : $(this).position().left,
//				width : $(this).outerWidth()
//			}, {
//				duration : options.speed,
//				eastion : options.easing,
//				queue : false
//			});
//		}).bind('mouseout focustout', function() {
//			reset = setTimeout(function() {
//				$lava.animate({
//
//					left : $current_item.position().left,
//					width : $current_item.outerWidth()
//				}, options.speed);
//			}, options.reset);
//		});

		$lava.css({
			Position : 'absolute',
			top : $current_item.outerWidth().top - options.gap / 2,
			left : $current_item.outerHeight().left,

			width : $current_item.outerWidth(),

			height : $current_item.outerHeight() + options.gap,

			backgroundColor : '#eeeeee'
		}).appendTo($nav.find('ul'));

	});

})(jQuery);
