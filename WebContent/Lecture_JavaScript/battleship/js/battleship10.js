/**
 * 
 */
/*
 * displayMessage() 구현 1. DOM을 이용해 id가 MessageArea인 요소를 가져오기 2.
 * displayMessage() 메서드에 전달된 메시지로 해당 요소의 innerHTML 속성 설정하기
 */
/*
 * 이 메서드는 문자열 메시지를 인자로 받아서 메시지 영역에 출력합니다.
 */

// 뷰 객체 구현
var view = {

	/*view  객체에 있는 메서드들은  guess 문자열에 들어 있는 행과 열을 id로 사용해
	요소를 찾고 "hit"나 "miss" 클래스를 추가한다.
	그리고 hit 배열에 들어가는 "hit"메시지는 실제 모델의 상태를,
	HTML에 있는 "hit" 클래스는 화면에 보여줄 셀의 클래스를 나타낸다.*/
	displayMessage : function(msg) {
		var messageArea = document.getElementById("messageArea");
		// 그리고 innerHTML 속성을 msg로 설정해 messageArea 요소의 텍스트를 갱신
		messageArea.innerHTML = msg;
	},
	/*
	 * displayHit(), displayMiss 구현 1. 명중이나 실패를 표시할 위치에 해당하는 두자리 숫자로 구성된 문자열
	 * 아이디를 구한다. 2. DOM을 이용해 그 아이디를 가진 요소를 가져온다. 3. 요소의 클래스 속성을 displayHit()
	 * 메서드에서는 hit, displayMiss() 메서드에서는 miss로 설정한다.
	 */
	displayHit : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},
	displayMiss : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};

// 모델 객체 구현
/*
 1. 변수
boardSize : 게임판 격자의 크기
numShips: 게임에 등장하는 전함 수
ships : 전함 수와 명중 여부
shipsSunk: 격침된 전함 수
shipsLength: 각 전함의 위치 수

2. 메서드
fire(): 전함을 공격하고 명중했는지 실했는지 알아내는 메서드
1) 그 위치를 차지하고 있느 모든 전함을 검사
2) 어떤 전함이 그 위체 있다면 명중한 것이므로 hits 배열에서 해당 요소에 표시하고 뷰에 알려줌.
	그리고 메서드에서 true 반환해 어딘가에 명중했음을 알려준다.
3) 추축한 위치에 전함이 없다면 실패한 것이므로 뷰에 말려주고 false를 반환.

3. 메서드 isSunk(): 전함이 격침되었는지 검사하는 메서드드 추가.
	전함을 인자로 받아서 전함이 격침되었다면 true,
	전함이 격침되지 않았다면 false를 반환.
*/

var model = {
	boardSize : 7,
	numShips : 3,
	shipLength : 3,
	/*shipsSunk는 게이머가 격침시킨 전함의 수를 보관하고 있으며
	게임을 시작할 때는 0으로 초기화*/
	shipsSunk : 0,
	/*ships 속성은  ship 객체들의 배열이며, 각 ship 객체는 위치와 명중 여부를 담고 있음.
	이전 코드에서는 ships에 변수로 선언했지만 이번 코드에서는 모델 객체의 속성으로 정의했음.
	이번 코드에서는 location와 hits 배열의 크기를 고정시켰으나 나중에는 배열을 동적으로 바꿀 것임.
	*/
	ships : [ {
		locations : [ "06", "16", "26" ],
		hits : [ "", "", "" ]
	}, {
		locations : [ "24", "34", "44" ],
		hits : [ "", "", "" ]
	}, {
		locations : [ "10", "11", "12" ],
		hits : [ "", "", "" ]
	} ],

	fire : function(guess) {
		/*ship 배열을 반복해 한번에 한 전함씩 검사.*/
		for (var i = 0; i < this.numShips; i++) {
			/*여기에서 전함 한 척에 대한 참조를 가져온다.*/
			var ship = this.ships[i];
			var locations = ship.locations;
			/*추측한 위치가 이 전함의 위치 중 하나와 일치하는지 확인
			 indexOf() : 인자로 받은 값이 있는지 배열을 검색하고
			 일치하는 것이 있다면 해당 요소의 인덱스를 반환
			 만약에 일치하는 것이 없다면 -1*/
			var index = locations.indexOf(guess);
			/*var index = ship.locations.indexOf(guess); 이렇게 위 두 줄을 한 줄로 처리 가능.*/
			if (index >= 0) {
				/*그러면 동일한 이덱스에 hit 문자열을 추가한다.*/
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("명중!");
				/*전함이 명중된 후에는 여기에서 격침되었는지 검사하고
				격침되었다면 모델에서 격침된 전함 수를 보관하는
				shipsSunk 속성의 값을 증가시킴.*/
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("전함이 격침되었습니다.");
				}
				/*return 문을 만나면 함수를 벗어남.
				break문을 만나면 break문이 속한 구문을 벗어남.*/
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("실패했습니다.");
		return false;
	},

	isSunk : function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			/*hit 값을 갖지 않은 위치였다면 전함이 격침되지 않았으므로 false를 반환*/
			if (ship.hits[i] != "hit") {
				return false;
			}
		}
		/*그렇지 않으면 전함이 격침된 것으로 true를 반환.*/
		return true;
	}
};

/* 컨트롤러 객체 구현
1.흐름
1) A0, B1 등 게이머가 추측한 위치를 입력받고 처리.
2) 입력값 횟수 보관
3) 최근 입력값을 이용해서 모델을 갱신하도록 요청
4) 게임이 끝났는지 판단. 모든 전함이 격침되면 게임이 끝남.

2. 변수
guesses : 입력값 횟수

3. 메서드 processGuess() : 입력값을 처리하고 모델에  그 걸 전달하고 
게임 종료 여부 판단. 

*/

var controller = {
	guesses : 0,
	/*게이머가 입력한 좌표값이 적절성 검사 메서드*/
	parseGuess : function(guess) {
		guess = guess.toUpperCase();
		/*게이머가 A0형태로 입력하면 processGuesss() 메서드가 여기에서 처리함*/
		var alphabet = [ "A", "B", "C", "D", "E", "F", "G" ];
		/*guess가 널이 아니고 길이가 2인지 확인*/
		if (guess === null || guess.length !== 2) {
			alert("입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요");
		} else {
			/*입력값이 첫번째 글자를 가져옴*/
			var firstChar = guess.charAt(0);
			/*그리고 나서 indexOf() 이용해서 글자에 해당하는 0~6까지의 인텍스를 가져옴*/
			var row = alphabet.indexOf(firstChar);
			/*입력값의 두번째 글자를 가져옴.*/
			var column = guess.charAt(1);
			if (isNaN(row) || isNaN(column)) {
				alert("위치값이 올바르지 않습니다.예: A0, B1");
				/*입력값이 0~6 사이의 숫자인지 확인.*/
				/*column은 문자열이지만 자동 형변환이 일어나 숫자와 비교할 수 있음.*/
			} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
				alert("입력값이 보드 바깥으로 벗어 났습니다.");
			} else {
				return row + column;
			}
		}
		/*어떤 테스트도 통과하지 못했을 때*/
		return null;
	},

	processGuess : function(guess) {
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;
			/*전함이 명중되면 fire() 메서드는 true를 반환*/
			var hit = model.fire(location);

			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("여러분은 " + this.guesses + "번 추축해 전함을 모두 격침시켰습니다.");
			}
		}
	}
};

/*
//발사실험
controller.processGuess("S0S");
controller.processGuess("SO");
controller.processGuess("A0");

controller.processGuess("A6");
controller.processGuess("B6");
controller.processGuess("C6");

controller.processGuess("C4");
controller.processGuess("D4");
controller.processGuess("E4");

controller.processGuess("B1");
controller.processGuess("B2");
controller.processGuess("B0");
*/

/*// 인터넷 참조 내 구조 HTML input button 에 onclick=fire() 삽입.
function fire() {
	var point = document.getElementById("guessInput");
	controller.processGuess(point.value);
}
*/

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
		guessInput.onkeypress = hendelKeyPress;
}

function handleFireButton() { 
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	// 한번 입력 후 기존 입력값을 지움
	guessInput.value = "";
}

function hendelKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	// [return]의 키 값이 13번임.
	if (e.keyCode == 13) {
		fireButton.click();
		return false;
	}
}

window.onload = init;