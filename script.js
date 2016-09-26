console.log('working!');


var suits = ["spades", "clubs", "diamonds", "hearts"];
var cardValue = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "jack", "queen", "king"];

var computerHand = [];
var userHand = [];

var newCard;
var randomIndex;

var deal ="user";
// var turn = "user";

// add function to build deck automatically





var deck = [
"aceSpades",
"aceClubs",
"aceDiamonds",
"aceHearts",
"twoSpades",
"twoClubs",
"twoDiamonds",
"twoHearts",
"threeSpades",
"threeClubs",
"threeDiamonds",
"threeHearts",
"fourSpades",
"fourClubs",
"fourDiamonds",
"fourHearts",
"fiveSpades",
"fiveClubs",
"fiveDiamonds",
"fiveHearts",
"sixSpades",
"sixClubs",
"sixDiamonds",
"sixHearts",
"sevenSpades",
"sevenClubs",
"sevenDiamonds",
"sevenHearts",
"eightSpades",
"eightClubs",
"eightDiamonds",
"eightHearts",
"nineSpades",
"nineClubs",
"nineDiamonds",
"nineHearts",
"tenSpades",
"tenClubs",
"tenDiamonds",
"tenHearts",
"jackSpades",
"jackClubs",
"jackDiamonds",
"jackHearts",
"queenSpades",
"queenClubs",
"queenDiamonds",
"queenHearts",
"kingSpades",
"kingClubs",
"kingDiamonds",
"kingHearts"
];



$(document).ready(function(){


	// Randomly select card from deck

	function randomCard() {
		randomIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		newCard = deck[randomIndex];
	}


	// Update arrays - move drawn card from deck array to user/comp hand array

	function updateArrays(randomIndex, hand, newCard) {
		deck.splice(randomIndex, 1);
		hand.push(newCard);
	}


// DEAL

	function dealUser() {
		randomCard();
		// $("#userDrawnCard").append('<div class="card faceUp">' + newCard + '</div>');
		addCardToUserHand(newCard);
		updateArrays(randomIndex, userHand, newCard);
	}

	function dealComp() {
			randomCard();
			addCardToComputerHand(newCard);
 			updateArrays(randomIndex, computerHand, newCard);
	}


	$("#dealButton").click(function() {
		var i = 0;
		while (i < 7) {
			dealUser();
			dealComp();
			i++;
		}
	});

		// TODO: create interval to simulate actual deal

	
	//  TODO: Card drawn and moves to appropriate hand (combine to one function)

			// function drawCard(x) {
			// 	if (turn == "user") {
			// 		$("#userDrawnCard").append('<div class="card faceUp">' + newCard + '</div>');
			// 		setTimeout(function() {
			// 			$("#userDrawnCard").empty();
			// 			$("#userHand").append('<div class="card faceUp cardInHand">' + x + '</div>');
			// 			}, 1000);
			// 	}

			// 	else if (turn == "computer") {
			// 		$("#computerDrawnCard").append('<div class="card faceDown"></div>');
			// 		setTimeout(function() {
			// 			$("#computerDrawnCard").empty();
			// 			$("#computerHand").append('<div class="card faceDown cardInHand">' + x + '</div>');
			// 			}, 1000);
			// 		}

			// 	else {
			// 		console.log('error drawing card');
			// 	}
			// }




// USER TURN

	// USER FLIPS CARD
		function userTurn() {
			randomCard();
			$("#userDrawnCard").append('<div class="card faceUp">' + newCard + '</div>');
			console.log(deck[randomIndex]);
			addCardToUserHand(newCard);
			updateArrays(randomIndex, userHand, newCard);
		}

	// NEW CARD ADDED TO USER HAND
		function addCardToUserHand(x) {
			setTimeout(function() {
				$("#userDrawnCard").empty();
				$("#userHand").append('<div class="card faceUp cardInHand">' + x + '</div>');
			}, 1000);
		}

	// USER SELECTS CARD TO ASK

		//$('div.card').click(function() {
		$(document).on('click', '.card', function (){
			console.log('clicked card');
			$(this).addClass('selectedCard');
		});
		

	// USER CLICKS 'GO FISH BUTTON'
		$("#goFishButton").click(function() {
			console.log('clicked');
			userTurn();
		});

	// USER CLICKS 'END TURN BUTTON'
		$("#endTurnButton").click(function() {
			console.log('clicked end turn button');
			computerTurn();
		});



// COMPUTER TURN


	// NEW CARD ADDED TO COMPUTER HAND
	function addCardToComputerHand(x) {
		setTimeout(function() {
			$("#computerDrawnCard").empty();
			$("#computerHand").append('<div class="card faceDown cardInHand"><p class="tempCompCardStyle">' + x + '</p></div>');
		}, 1000);
	}


	 function computerTurn() {
	 	randomCard();
	 	$("#computerDrawnCard").append('<div class="card faceDown"><p class="tempCompCardStyle">' + newCard + '</p></div>');
	 	console.log('computer selected: ' + newCard);
	 	addCardToComputerHand(newCard);
	 	updateArrays(randomIndex, computerHand, newCard);
	 }


});


// other deck card methods

// deck2 = [
// {"number": "A",
// "suit": "spades"
// },
// {"number": "A",
// "suit": "clubs"
// }];



