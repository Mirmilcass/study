/**
 * 
 */

var name1 = "고수성";
var name2 = "엄성일";
var name3 = "안팜";
var names;
var price;

names = prompt("이름을 입력하세요(고수성,엄성일 두사람 뿐입니다. 안팜)");

if (names == name1) {
	price = prompt("가격을 입력하세요(단, 가격은 100단위이며 1000이하입니다.)");
	if (price < 100) {
		alert("너무 싸서 품질이 의심되... 못사겠다.");
	} else {
		if (price > 1000) {
			alert("너무 비싸서 안살래.");
		} else {
			if (price > 600) {
				alert("오 맘에드는 가격이야 구입하겠어!");
			} else if (100 < price < 600) {
				alert("아 맘에 안들어.. 오늘은 돌아가겠어!1");
			}
		}
	}
}

if (names == name2) {
	price = prompt("가격을 입력하세요(단, 가격은 100단위이며 1000이하입니다.)");
	if (price < 200) {
		alert("너무 싸서 품질이 의심되... 못사겠다.");
	} else {
		if (price > 1000) {
			alert("너무 비싸서 안살래.");
		} else {
			if (200 < price < 600) {
				alert("오 맘에드는 가격이야 구입하겠어!");
			} else if (1000 > price > 600) {
				alert("아 역시 맘에 안들어.. 오늘은 돌아가겠어!2");
			}
		}
	}
}

if (names == name3) {
	alert("팔지않고 보냈습니다.");
}