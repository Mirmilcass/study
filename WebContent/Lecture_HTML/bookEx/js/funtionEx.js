/*function bark(name, weight) {
	console.log(name + "는 월월 짓습니다.");
	console.log(name + "는 멍멍 짓습니다.");
}

bark
 */
function saveMyprofile(name, birthday, GPA, newuser) {
	if (birthday >= 2004) {
		console.log(name + "의 생년은 " + birthday + "년이고 " + "GPA 점수는 " + GPA
				+ "이고 " + newuser + "입니다.");
	}
}

saveMyprofile("크리스", 1991, 3.81, "신규 사용자");
saveMyprofile("고수성", 2005, 3.81, "신규 사용자");

var student = "고수성";
var year = 1983;
var GPA = 381 / 100;
var isNewUser = (status == "신규사용자");

saveMyProfile(student, year, GPA, isNewUser);

function speak(kind) {
	var defaultsound = " ";
	if (kind == "강아지") {
		alert("멍멍");
	} else if (kind == "고양이") {
		alert("야옹");
	} else {
		alert(defaultsound);
	}
}

var pet = prompt("애완 동물의 종류를 입력하세요:) ");
speak(pet);

function barkAtTheMoon() {
	alert("아우~~~~~~~");
}

barkAtTheMoon();

function makeTea(cups, tea) {
	alert(cups + "잔의" + tea + "차를 끊입니다.");
}

makeTea(3, "고수성", "아이스티", 42);
makeTea(3);

function calculataArea(r) {
	var area;
	if (r <= 0) {
		return 0;
	} else {
		area = Math.PI * r * r;
		return area;
	}
}

var radius = 5.2;
var theArea = calculataArea(radius);
alert("면적: " + theArea);

/* 전역 변수 */
var avatar = "아바타";
var skill = 1.0;
var pointsperlevel = 1000;
var userPoints = 2008;
var levelThreashold = 1000;

/*function getScore(points) {
	 지역 변수들 
	var score;
	var i = o;
	while (i < levelThreashold) {
		i = i + 1;	}
	return score;
}*/

function getAvatar(points) {
	var level = points / pointsperlevel;
	if (level == 0) {
		return "테디 베어";
	} else if (level == 1) {
		return "고양이";
	} else if (level == 2) {
		return "고릴라";
	}
}

function updatePoints(bouns, newPoints) {
	var i = 0 ;
	while (i<bouns) {
		newPoints = newPoints + skill + bouns;
		i = i + 1;
	}
	return point = newPoints + userPoints;
}

userPoints = updatePoints(2, 100);
avatar = getAvatar(2112);

alert(avatar);
alert(point);


alert(levelThreashold);
alert(i);