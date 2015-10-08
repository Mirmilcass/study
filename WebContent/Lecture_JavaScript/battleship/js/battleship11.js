var view = {
	displayMessage : function(msg) {
		var messageArea = document.getElementById("messageArea");
		// 그리고 innerHTML 속성을 msg로 설정해 messageArea 요소의 텍스트를 갱신
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
	}
};

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
	model.fire(guess);
}

window.onload = init;