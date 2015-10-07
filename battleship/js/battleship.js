/* 
 displayMessage() 구현
 1. DOM을 이요해 id가 messageArea인 요소 가져오기
 2. displayMessage() 메서드에 전달된 메시지로 해당요소의 innerHTML 속성 설정하기
 */

//view 객체 구현
var view = {
	/* 이 메서드는 문자열 메시지를 인자로 받아서 메시지 영역에 출력합니다. */
	displayMessage : function(msg) {
		// 페이지에서 messageArea 요소를 가져옴
		var messageArea = document.getElementById("messageArea");
		// 그리고 innnerHTML속성을 msg로 설정해 messageArea 요소의 텍스트를 갱신
		messageArea.innerHTML = msg;
	},
	// displayHit(), displayMiss() 구현
	/*
	 * 1. 명중이나 실패를 표시할 위치에 해당하는 두 자리 숫자로 구성된 문자열 아이디를 구한다. 
	 * 2. DOM을 이용해 그 아이디를 가진 요소를 가져온다. 
	 * 3. 요소의 클래스 속성을 displayHit() 메서드에서는 hit, displayMiss() 메서드에서는 miss로 설정한다.
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

view.displayHit("00");
view.displayMiss("02");
view.displayMessage("똑똑, 이 메시지가 보이시나요? ");

// 모델 객체 구현

/*
 * 변수 boardSize : 게임판 격자의 크기 
 * numShips: 게임에 등장하는 전함 수 
 * ships: 전함 수와 명중 여부
 * shipsSunk: 격침된 전함 수 
 * shipLength: 각 전함의 위치 수
 * 
 * 메서드 fire(): 전함을 공격하고 명중했는지 실패했는지 알아내는 메서드 
 * 1) 그 위치를 차지하고 있는 모든 전함을 검사. 
 * 2) 어떤 전함이 그위치에 있다면 명중한 것이므로 hits 배열에서 해당 요소에 표시하고 뷰에 알려줌. 그리고 메서드에서 true
 */

var model = {
	boardSize : 7,
	numShips : 3,
	/*
	 * shipsSunk는 게이머가 격침시킨 전함의 수를 보관하고 있으며, 게임을 시작할때는 0으로 초기화.
	 */
	shipsSunk : 0,
	shipLength : 3,
	// ships 속성은 ship 객체들의 배열이며, 각 ship 객체는 위치와 명중 여부를 담고 있음
	// 이전 코스에서는 ships를 변수로 선언했지만 이번 코드에서는 모델 객체의 속성으로 정의했다.
	// 이번 코드에서는 location와 hits 배열의 크기를 고정시켰으나 나중에는 배열을 동정으로 바꿀것
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
		/*
		guess = 16;
		location = ["06", "16", "26"];
		일치하는 지 확인하고 일치한다면 명중,
		일치하지 않는다면 실패.
		
		this.ships[0];
		
		*/
		// ships 배열을 반복해 한번에 한 전함씩 검사
		for (var i = 0; i < this.numShips; i++) {
			// 여기에서 전함 한척에 대한 참조를 가져온다.
			var ship = this.ships[i];
			locations = sip.locations;
			// 추측한 위치가 이 전함의 위치 중 하나와 일치하는지 확인
			var index = locations.indexOf(guess);
			if (index >= 0) {
				ships.hits[index] = "hit";
				return true;
			}
			return false;
		}
	}
};