var view = {
	/*
	view 객체에 있는 메서드들은 guess 문자열에 들어 있는 행과 열을 id로 사용해 요소를 찾고 "hit"나 "miss" 클래스를 추가한다.
	그리고 hit 배열에 들어가는 "hit"메시지는 실제 모델의 상태를, HTML에 있는 "hit"클래스는 화면에 보여줄 셀의 클래스를 나타낸다.
	*/
	displayMessage : function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "hit");

	},
	displayMiss : function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};

/*
모델 격체 구현

1. 변수

2. 메서드 fire(): 전함을 공격하고 명중했는지 실패했는지
*/

var model = {
	boardSize : 7,
	numShips : 3,
	shipLength : 3,
	shipsSunk : 0,
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
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			// var locations = ship.locations;
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("명중");
				if (this.isSunk(ship)) {
					view.displayMessage("전함이 격침되었습니다.");
					this.shipsSunk++;

				}
				return true;
			}

		}
		view.displayMiss(guess);
		view.displayMessage("실패했습니다.");
		return false;

	}, // fire() END

	isSunk : function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] != "hit") {
				return false;
			}
		}
		return true;
	} // isSuck END
}; // model END

/* 본인 생각으로 진행 // 단순 폼 입력만됨.
var guess = document.getElementById("guessInput");

function fire() {
	model.fire(guess.value);
}
*/

/* 수업내역
컨트롤러 객체구현
1. 흐름
1) A0, b1 등 게이머가 추측한 위치를 입력받고 처리.
2) 입력받은 횟수 보관
3) 최근 입력값을 이용해서 모델을 갱신하도록 요청
4) 게임이 끝났는지 판단. 모든 전함이 격침되면 게임이 끝남.

2. 변수
guesses : 입력값 횟수

3. 메서드 processGuess() : 입력값을 처리하고 모델에 그 걸 전달하고 게임 종료 여부 판단.
*/

var controller = {
	guesses : 0,
	processGuess : function(guess) {
		/*
		게이머가 A0형태로 입력하면 processGuess() 메서드가 여기에서 처리함
		
		1. 게이머가 입력한 값이 올바른지 판단
		
		*/
		var alphabet = [ "A", "B", "C", "D", "E", "F", "G" ];

		// guess가 null이 아니고 길이가 2인지 확인합니다.
		if (guess === null || guess.length !== 2) {
			alert("입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요.");
		} else {
			// 알파벳 소문자를 대문자로 변경
			guess = toUpperCase();
			// 입력값의 첫번째 글자를 가져옴
			// var firstChar = guess.charAt(0);
			// 그리고 나서 indexOf() 이용해서 근자에 해당하는 0~6까지의 인덱스를 가져옴.
			var row = alphabet.indexOf(guess.charAt(0));
			var column = guess.charAt(1);
			// isNaN() 함수를 이용해서 행이나 열이 숫자가 아닌지 검사.
			if (isNaN(row) || isNaN(column)) {
				alert("위치값이 올바르지 않습니다. 예) A0, B1");
			// 입력값이 0~6 사이의 숫자인지 확인.
//			charAt()을 통해 입력하였을때 문자열 입력이 된다. JS이기에 자동 형변환이 일어나 비교가 된다.
//				model.boardSize = 7 이다. row, column은 6이내가 되야 되기에 >= 를 사용.
			} else if (0 > row >= model.boardSize || 0 > column >= model.boardeSize) {
				alert("입력값 보드 바깥으로 벗어났습니다.");
			} else {
				retun row + column;
			}
		}
		// 위 테스트 미 통과 시
		return null;
		
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
//			전함이 몇중이 되면 fire() 메서드가 true를 반환
			var hit = model.fire(location);
			if (hit && model.shipsSunk == model.numShips) {
				view.displayMessage("여러분은 " + this.guesses + "번 추측해 전함을 모두 격침 시켰습니다." );
			}
		}
	}
}; /* controller END */