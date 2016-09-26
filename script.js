console.log('working!');


var suits = ["spades", "clubs", "diamonds", "hearts"];
var cardValue = ["ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "jack", "queen", "king"];

var computerHand = [];
var userHand = [];

var selectedCardsArray = [];

var newCard;
var randomIndex;



var deal ="user";
// var turn = "user";


// BUILD DECK AUTOMATICALLY


var cardNumber =["A","2","3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var cardSuit = ["spades", "clubs", "diamonds", "hearts"];
var cardStatus = [];
var cardRef = [];
var newDeck = [];
var askedCard; //this is the object in the user's hand array that represents their selected card
var createRef;
var matchingCard;
var matchId;
var userMatches = [];
var computerMatches = [];


for (j = 0; j < cardNumber.length; j++) {
	for(var i = 0; i < cardSuit.length; i++)  {
	    newDeck.push({"cardNumber": cardNumber[j], "suit": cardSuit[i], "cardRef": cardSuit[i] + cardNumber[j], "cardStaus": 'none'});
	}
}


// old deck

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

//$(document).ready(function(){








	// Randomly select card from deck

	function randomCard() {
		randomIndex = Math.floor((Math.random() * newDeck.length - 1) + 1);
		console.log('randomIndex: ' + randomIndex);
		newCard = newDeck[randomIndex];
		console.log(newCard);
	}


	// Update arrays - 

		//move drawn card from deck array to user/comp hand array

		function updateArrays(randomIndex, hand, newCard) {
			newDeck.splice(randomIndex, 1);
			hand.push(newCard);
		}


// DEAL

	function dealUser() {
		randomCard();
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

		// TODO: create interval/timeout to simulate actual deal timing

	
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
			addCardToUserHand(newCard);
			updateArrays(randomIndex, userHand, newCard);
		}

	// NEW CARD ADDED TO USER HAND
		function addCardToUserHand(x) {
			var thisSuit = x.suit;
			var thisNum = x.cardNumber;
			console.log(thisSuit);
			$("#userDrawnCard").empty();
			$("#userHand").append('<div class="card faceUp cardInHand ' + thisSuit + ' ' + thisNum + '"' + 'id="' + thisSuit + thisNum + '">' + x.cardNumber + ' of ' + x.suit + '</div>');
			$("#checkUser").append(x.cardNumber + x.suit + '<br>');
		}

		
	// USER SELECTS CARD 

		$(document).on('click', '.card', function (){
			console.log('clicked card');

			// deselects card if same card is clicked

			if ($(this).hasClass("selectedCard")) {
				console.log('same card');
				$(this).removeClass("selectedCard");
				selectedCardsArray = [];
			}

			// ensures that only one card selected at a time (switches cards)

			else if (selectedCardsArray.length > 0) {
				$('.card').removeClass('selectedCard');
				selectedCardsArray.splice(0,1); //TODO or just empty
				console.log('length > 0 - cards in array: ' + selectedCardsArray);
				$(this).addClass('selectedCard');
				selectedCardsArray.push(this);		
			}


			else {
				$(this).addClass('selectedCard');
				selectedCardsArray.push(this);
			}
			
		});

	// USER ASKS FOR SELECTED CARD

		// function lookForCompMatch(obj) {
		// 	for (j = 0; j < computerHand.length; j++) {
		// 		if (obj.cardNumber == computerHand[j].cardNumber) {
		// 		matchingCard = computerHand[j];	
		// 			console.log('match!!!' + "comp card: " + computerHand[j]);
		// 			updateUserMatches(createRef, askedCard, j, matchingCard);
		// 		}
		// 		else {
		// 			console.log('not a match');
		// 		}
		// 	}
		// }


		// move matches to match array 246

		// function updateUserMatches(userMatchIndex, askedCard, compMatchIndex, compCard) {
		// 	userHand.splice(userMatchIndex, 1);
		// 	userMatches.push(askedCard);
		// 	//computer match
		// 	computerMatches.splice(compMatchIndex, 1);
		// 	userMatches.push(compCard);
		// }


	// CLICK ASK BUTTON

	$("#askButton").click(function() {
		$('.selectedCard').removeClass('selectedCard').addClass('asking');
		createRef = $('.asking').attr('id');
		console.log(createRef);

		// find card in user hand array that corresponds with card selected 
		for (i = 0; i < userHand.length; i++) {
			if (createRef == userHand[i].cardRef) {
				
				// variable askedCard is the array object for the selected card
				var askedCard = userHand[i];
				
				// function to see if anything in comp hand has same number value
				
				for (j = 0; j < computerHand.length; j++) {
					if (askedCard.cardNumber == computerHand[j].cardNumber) {
						matchingCard = computerHand[j];	
						console.log('match!!!' + "comp card: " + computerHand[j].cardRef);
						matchId = matchingCard.cardRef;
						document.getElementById(matchingCard.cardRef).remove();

						//UPDATE USER MATCHES & HAND ARRAYS
						userHand.splice(i, 1);
						userMatches.push(askedCard);
						computerHand.splice(j, 1);
						userMatches.push(matchingCard);
						$("#userScore").append('Your Total Matches: ' + userMatches.length/2);
						$(".asking").remove();
					}

					else {
						//$("#messageBox").text('not a match'); //TODO add message area (no matches)
					}

				}
			}
		}

		$(".asking").removeClass('asking');

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

			$("#computerDrawnCard").empty();
			$("#compHand").append('<div class="card faceDown cardInHand" id="' + x.suit + x.cardNumber + '"><p class="tempCompCardStyle">'  + x.cardNumber + ' of ' + x.suit +  '</p></div>');
			$("#checkComp").append(x.cardNumber + x.suit + '<br>');

	}


	 function computerTurn() {
	 	randomCard();
	 	$("#computerDrawnCard").append('<div class="card faceDown"><p class="tempCompCardStyle">' + newCard + '</p></div>');
	 	console.log('computer selected: ' + newCard);
	 	addCardToComputerHand(newCard);
	 	updateArrays(randomIndex, computerHand, newCard);
	 }


//});


// other deck card methods

// var cardNumber =["A","2","3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
// var cardSuit = ["Spades", "Clubs", "Diamonds", "Hearts"];
// var cardStatus = [];
// var newDeck = [];

// for (j = 0; j < cardNumber.length; j++) {
// 	for(var i = 0; i < cardSuit.length; i++)  {
// 	    newerDeck.push({"cardNumber": cardNumber[j], "suit": cardSuit[i], "cardStaus": 'none'});
// 	}
// }
	

