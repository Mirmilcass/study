/*
1. 먼저 페이지 로딩 완료되었을때 "처리기 작동" 알림창을 보여줌
*/
function pageLoadedHandler() {
	alert("처리기 작동");
}

// 2. 페이지 로딩 완료 이벤트가 발생했을 때 실생할 함수가 있다는 것을 브라우저가 알 수 있도록 연결

window.onload = pageLoadedHandler;