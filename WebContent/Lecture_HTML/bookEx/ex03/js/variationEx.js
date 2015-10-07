/**
 * 
 */

function dogyears (dogname, age) {
	var years = age * 7;
	console.log(dogName + "는" + years + "살입니다.");
}

var myDog = "해피";
dogYears (myDog, 4);

function makeTea(cups, tea) {
	alert(cups + "잔의" + tea + "차를 끓입니다.");
}

var guests = 3;
makeTea(guests, "얼그레이");

function secret() {
	alert("인생의 비밀 숫자는 42입니다.");
}

function speak(kind) {
	var defaultsound = " ";
	if (kind == "강아지") {
		alert("멍멍");
	} else if (kind == "고양이"){
		alert("야옹");
	} else {
		alert(defaultsound);
	}
}

var pet = prompt("애완 동물의 종류를 입력하시오: ");
speak(pet);