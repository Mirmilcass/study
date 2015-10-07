/**
 * 
 */
/* id가 code9인 요소를 가져옴. */
var access = document.getElementById("code9");
// access: code9에 해당하는 Element가 저장. "<p>"내시계가 멈췄다.</p>"가 저장.

// innerHTML : Element에서 Contents를 꺼냄. 
// code: "내 시계가 멈췄다."가 저장.
var code = access.innerHTML;
code = "한반중에 " + code;
alert(code);

