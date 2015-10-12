var view = {
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
var model = {
	boardSize : 7,
	numShips : 3,
	shipLength : 3,
	shipsSunk : 0,
	/*
	하드 코딩된 전함의 위치 수정
	
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
	
	*/

	ships : [ {
		locations : [ 0, 0, 0 ],
		hits : [ "", "", "" ]
	}, {
		locations : [ 0, 0, 0 ],
		hits : [ "", "", "" ]
	}, {
		locations : [ 0, 0, 0 ],
		hits : [ "", "", "" ]
	} ],

	fire : function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			var locations = ship.locations;
			var index = locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("명중!");
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("전함이 격침되었습니다.");
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("실패했습니다.");
		return false;
	},

	isSunk : function(ship) {
		for (var i = 0; i < this.shipLength; i++) {
			if (ship.hits[i] != "hit") {
				return false;
			}
		}
		return true;
	},
	// isSunk END
	/*
	반복적으로 전함을 만들어서 필요한 전함이 다 만들어질때까지 모델의 ship 배열을 채운다.
	이 때 generateShip() 메서드를 이용해 전함을 새로 만들때마다 
	collision() 메서드를 이용하여 기존 전함과 충돌하지 않는지 검사한다.
	*/
	// random ship generation
	generateShiplocations : function() {
		var locations;
		for (var i = 0; i < this.numShips; i++) {
			do {
				// 새로운 위치 생성
				locations = this.generateShip();
				// 이전 전함과 충돌되지 않는지 비교 분석
				// 만약 충돌시 다시 시도
			} while (this.collision(locations));
			/*
			일단 충돌하지 않는 위치를 만들고 나면
			이위치를 model.ships 배열에 저장된 전함의 위치로 할당.
			*/
			this.ships[i].locations = locations;
			console.log(locations);
		}
		// 콘솔에서 전함 위치 확인
	
	}, // generateShiplocations END

	generateShip : function() {
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction === 1) {
			// 가로로 놓인 전함의 출발 위치 생성
			row = Math.floor(Math.random() * this.boardSize);
			// boardSize(현재 7)에서 2를 빼면 시작하는 열이 0~4까지 범위로 들어감.
			// 전함의 크기(shipLength)의 크기가 바뀌어도 코드를 변경 하지 않아도 됨.
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else {
			// 세로로 놓인 전함의 출발 위치 생성
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocation = [];
		for (var i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				// 새로운 가로 방향 전함의 배열에 위치를 추가
				// 열번호(col)에 i를 더한다. 이 루프가 처음 실행될 때 i = 0, 두번째 실행될 때 i = 1, 세번째
				// 실행될 때 i = 2
				// 그래서 "01", "02", "03"이 배열에 들어감.
				newShipLocation.push(row + "" + (col + i));
			} else {
				// 새로운 세로 방향 전함의 배열에 위치를 추가
				// 그래서 "31", "41", "51"
				newShipLocation.push((row + i) + "" + col);
			}
		}
		// 필요한 위치가 모두 만들어 지면 배열을 반환
		return newShipLocation;
	}, // generateShip END
	// locations는 게임판 위에 새로운 전함들을 놓을 위치를 담은 배열
	collision : function(locations) {
		// 이미 게임판에 있는 각 전함에 대해
		for (var i = 0; i < this.numShips; i++) {
			var ship = model.ships[i];
			// 새로운 전함의 위치중 하나라도 각 전함의 위치와 겹치는지 검사
			for (var j = 0; j < locations.length; j++) {
				// indexOf() 메서드를 이용해 이 위치가 기존 전함에 이미 있는지 확인.
				// 기존에 있다면 0 이나 0보다 큰 인덱스가 반환되므로, 충돌을 발견했다는 의미에서 true를 반환.
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	} // collision END
}; // model END

var controller = {
	guesses : 0,
	parseGuess : function(guess) {
		guess = guess.toUpperCase();
		var alphabet = [ "A", "B", "C", "D", "E", "F", "G" ];
		if (guess === null || guess.length !== 2) {
			alert("입력이 올바르지 않습니다. 게임판의 문자와 숫자를 이용해 입력하세요");
		} else {
			var firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);
			if (isNaN(row) || isNaN(column)) {
				alert("위치값이 올바르지 않습니다.예: A0, B1");
			} else if (0 > row >= model.boardSize || 0 > column >= model.boardSize) {
				alert("입력값이 보드 바깥으로 벗어 났습니다.");
			} else {
				return row + column;
			}
		}
		return null;
	},

	processGuess : function(guess) {
		var location = this.parseGuess(guess);
		if (location) {
			this.guesses++;

			var hit = model.fire(location);

			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("여러분은 " + this.guesses + "번 추측해 전함을 모두 격침시켰습니다.");
			}
		} // if END
	} // processGuess END
}; // controller END

function init() {
	var fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = hendelKeyPress;
	var point = document.getElementsByTagName("td");
	for (var i = 0; i < point.length; i++) {
		point[i].onclick = showAnswer;
	}
	model.generateShiplocations();
}

function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}

function hendelKeyPress(e) {
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode == 13) {
		fireButton.click();
		return false;
	}
}

function showAnswer(e) {
	var point = e.target;
	var guess = point.id;

	if (guess) {
		var hit = model.fire(guess);
		controller.guesses++;

		if (hit && model.shipsSunk === model.numShips) {
			view.displayMessage("여러분은 " + controller.guesses + "번 추측해 전함을 모두 격침시켰습니다.");
		}

	}
}

window.onload = init;