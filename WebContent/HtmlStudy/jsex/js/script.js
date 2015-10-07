/**
 * 
 */

document.getElementsByTagName('h1');
document.getElementsByTagName('li');

var age=33;
age = 10;
var name = 고수성;
var phone = 01074520001;
var address;
/* var, if, else, true, false, while, for */
var isEligibe = false;
var total;
var price;
var discount;

price = 100;
discount = 10;

var joke = "자바 스크립트가 술집에 들어갔다";
var toldjoke = "fasle";
var $punchline = "저기 있는 세미콜론을 조심하세요.";
var percentage = 20;
var result;

var str1 = "친애하는" + "독자님" + ".";
var str2 = "친애하는 독자님.";
/* 위 2가지는 동일함 */

/* 반복문 */
var scoops = 4;
while (scoops > 0) {
	document.write("한 숟가락 더!");
	scoops = scoops -1;
}


if (age>14) {
	alert("나이좀 그만 먹어라");
}
else {
	alert("너무 어린거 아니냐")
	alert("환영합니다. " + name + "님!");
}

total = price - (price * (discount / 100));
if(price > 200){
	freeShipping{};
}

if (toldjoke == true) {
	alert($qunchline);
}
else {
	alert(joke);
}

alert("Hollow World!");
var word = "병";
var count = 99;

/*
console.log()
-------------
var messge = "안녕" + " " + "친구야";
 */
while (count > 0) {
	console.log(count + " " + word + "의 맥주가 벽장에 있다네");
	console.log(count + " " + word + "의 맥주라네,");
	console.log("한 병을 내려서, 건네주었네,");
	if (count > 0) {
		console.log(count + " " + word + "의 맥주가 벽장에 있네.");
	} 
	else {
		console.log("No more" + word + "이제 벽장엔 한" + word + "의 맥주도 없다네.");
	}
}