/**
 * 
 */

;
(function($) { // 자바 스크립트 실행 함수
	$(function() {
		// 오디오 객체를 호출
		var banner_audio = new Audio();
		webm = isSupportWebM();
		if (webm) {
			banner_audio.src = 'media/banner_sound.webm';
		} else {
			banner_audio.src = 'media/banner_sound.mp3';
		}
		// "banner" 클래스를 가진 요소를 가져옴(jQuery에서는 요소 선택시 css 구문을 사용)
		// 그리고 bind()라는 jQuery 메소드를 호출함
		// 이벤트 (mouseover focusin) 발생시 -> 이후 처리되는 함수 function().
		$('.banner').bind('mouseover focusin', function() {
			banner_audio.load();
			banner_audio.play();
		}).bind('mouseout focusout', function() {
			banner_audio.pause();
			banner_audio.currentTime = 0;
		})
	})
})(jQuery);
function isSupportWebM() {
	var tester = document.createElement('audio');
	return
	!!tester.canPlayType('audio/webm');
};