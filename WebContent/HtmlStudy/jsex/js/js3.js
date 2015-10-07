/**
 * 
 */

var name = "고수성" || "엄성일" || "안팔아!";

var wantprice1 = "100";
var wantprice2 = "400";
var wantprice3 = "700";

var price;

var isSeil = false;

function seils() {
	while (isSeil == false) {
		name = prompt("구매자 이름을 적어주세요.(고수성, 엄성일 두명만 있고 안팔아! 도 가능)");
		if (name == "고수성" || name == "엄성일") {
			price = prompt("가격을 제시하세요.(100 단위로 입력하세요.)");
			if (price < 200) {
				isSeil = false;
				alert("가격이 너무 싸서 품질이 의심되는데..?");
			} else {
				if (price > 1000) {
					isSeil = false;
					alert("가격이 너무 비싸... 안살래.");
				} else {
					if (name == "고수성") {
						if (price == wantprice1 || price == wantprice2) {
							alert("내 맘에 안들어 안사");
						} else if (price == wantprice3) {
							alert("내 맘에 드는 가격이야 사겠어!");
							isSeil = true;
						}
					} else if (name == "엄성일") {
						if (price == wantprice1 || price == wantprice2) {
							alert("내 맘에 드는 가격이야 사겠어!");
							isSeil = true;
						} else if (price == wantprice3) {
							alert("내 맘에 안들어 안사");
						}
					}
				}
			}
		} else {
			if (name == "안팔아!") {
				break;

			} else {
				alert("다시 적어주세요.");
			}
		}
	}
}

var seil = name + "님께" + price + "에 판매를 성공하였습니다.";

document.write(seil);
 