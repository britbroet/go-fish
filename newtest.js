console.log('working!');

// !!!! THIS VARIABLE CALL WORKS
// $('#' + newCardID).on("click", function() {

var compHandArray = [];
var userHandArray = [];
var selectedCardsArray = [];
var inPlay = [];

var userMatches = [];
var computerMatches = [];

var randomCard;
var randomIndex; 
var newCardID;
var turn;
var cardRefUI;

var turn = 0;

// BUILD DECK AUTOMATICALLY


var numberOption =["A","2","3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var suitOption = ["spades", "clubs", "diamonds", "hearts"];
var deck = [];

for (j = 0; j < numberOption.length; j++) {
	for(var i = 0; i < suitOption.length; i++)  {
	    deck.push(
	    	{"cardNumber": numberOption[j], "cardSuit": suitOption[i], "cardId": suitOption[i] + numberOption[j], "uiElement": '$("' + suitOption[i] + numberOption[j] + '")'   }
	    );
	}
}


//$(document).ready(function(){

// DEALING AND DRAWING CARDS 

	// Randomly select card from deck  TODO: shuffle and take top?

	function selectRandomCard() {
		randomIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		//console.log('randomIndex: ' + randomIndex);
		randomCard = deck[randomIndex];
		//console.log(newCard);
	}


	// Update arrays - 

	//move drawn card from deck array to user/comp hand array
		// origin = deck or hand card is being drawn from
		// originIndex = index of card in deck/hand
		// target = array to send card to

	function drawUpdateArrays(origin, originIndex, target) {
		target.push(origin[originIndex]);
		origin.splice(originIndex, 1);		
	}

	function matchUpdateArrays(origin, originIndex, target) {
		target.push(origin[originIndex]);
		origin.splice(originIndex, 1);		
	}


// DEAL

	function dealUser() {
		selectRandomCard();
		drawUpdateArrays(deck, randomIndex, userHandArray);
		addCardToUserHandUI(randomCard);
	}

	function dealComp() {
			selectRandomCard();
 			drawUpdateArrays(deck, randomIndex, compHandArray);
 			addCardToCompHandUI(randomCard);
	}


	$("#dealButton").click(function() {
		var i = 0;
		while (i < 7) {
			dealUser();
			dealComp();
			i++;
		}
	});


	// NEW CARD ADDED TO USER HAND

	function addCardToUserHandUI(card) {
		newCardID = card.cardSuit + card.cardNumber;
		$("#drawnCardUI").empty();	
		$("#userHandUI").append('<div id="' + newCardID + '">' + card.cardNumber + '<br>' + card.cardSuit + '</div>');
		$('#' + newCardID).addClass('card faceUp cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
		// tried adding on click function here but not working
	}


	// NEW CARD ADDED TO COMPUTER HAND
	
	function addCardToCompHandUI(card) {
		newCardID = card.cardSuit + card.cardNumber;
		$("#drawnCardUI").empty();
		$("#compHandUI").append('<div id="' + newCardID + '"><p class="tempCompCardStyle">'  + card.cardNumber + '<br>' + card.cardSuit +  '</p></div>');
		$('#' + newCardID).addClass('card faceDown cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
	}

// TODO: add pause when card drawn


// USER TURN

	// USER SELECTS CARD FROM THEIR HAND TO ASK ABOUT

		$(document).on('click', '.faceUp', function (){
			console.log('clicked card');

			cardRefUI = $(this).attr('id');
			console.log('card ref ui: ' + cardRefUI);

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

	
	// USER DRAWS FROM DECK (GO FISH)

	function userTurn() {
		selectRandomCard();
		$("#drawnCard").append('<div class="card faceUp">' + randomCard + '</div>');
		drawUpdateArrays(deck, randomIndex, userHandArray);
		addCardToUserHandUI(randomCard);
	}






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


	//CLICK ASK BUTTON

		$("#askButton").click(function() {
		$('.selectedCard').removeClass('selectedCard').addClass('asking');
		cardRefUI = $('.asking').attr('id');
		console.log(cardRefUI);

		// find card in user hand array that corresponds with card selected 
		for (i = 0; i < userHandArray.length; i++) {
			if (cardRefUI == userHandArray[i].cardId) {
				
				// variable askedCard is the array object for the selected card
				var askedCard = userHandArray[i];
				
				// function to see if anything in comp hand has same number value
				
				for (j = 0; j < compHandArray.length; j++) {
					if (askedCard.cardNumber == compHandArray[j].cardNumber) {
						matchingCard = compHandArray[j];	
						console.log('match!!!' + "comp card: " + compHandArray[j].cardId);
						matchId = matchingCard.cardId;
						document.getElementById(matchingCard.cardId).remove();

						//UPDATE USER MATCHES & HAND ARRAYS
						userHandArray.splice(i, 1);
						userMatches.push(askedCard);
						compHandArray.splice(j, 1);
						userMatches.push(matchingCard);
						$("#userScore").append('Your Total Matches: ' + userMatches.length/2);
						$(".asking").remove();
					}

					else {
						//$("#messageBox").text('not a match'); //TODO add message area (no matches)
						console.log('no matches'); // TODO MESSAGE BOX
					}
				}
			}
		}

		$(".asking").removeClass('asking');

	});


	// USER CLICKS 'GO FISH BUTTON'
		$("#goFishButton").click(function() {
			console.log('clicked');
			$(".asking").removeClass('asking');
			userTurn();
		});

	// USER CLICKS 'END TURN BUTTON'
		$("#endTurnButton").click(function() {
			console.log('clicked end turn button');
			computerTurn();
		});



// COMPUTER TURN GO FISH

	

	 function computerTurn() {
	 	selectRandomCard();
	 	//$("#computerDrawnCard").append('<div class="card faceDown"><p class="tempCompCardStyle">' + randomCard + '</p></div>'); TODO - drawn card animation
	 	console.log('computer selected: ' + randomCard);
	 	addCardToCompHandUI(randomCard);
	 	updateArrays(deck, randomIndex, compHandArray);
	 }


//});

// INITIALLY FIND MATCHES

for (i = 0; i < userHandArray.length; i++) {
	var card = userHandArray[i].cardNumber;
		for (j = 0; j < userHandArray.length - 1; j++) {
			if j (!== i) {
				if card == userHandArray[j].cardNumber {
					matches = matches++
				}
			}
		}
}

find class 

$(".compHandUI .")


	

