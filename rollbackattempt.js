console.log('working!');

// !!!! THIS VARIABLE CALL WORKS
// $('#' + newCardID).on("click", function() {

var stuffDivLength;
var compDivLength;

var randomCard; // card object (from deck) chose at random by SelectRandomCard()
var randomIndex; // index of random card in deck
var newCardID; 
var cardRefUI; // ID of card in play?
var cardRefNum;

var userStartWait;
var compStartWait;
var compTurnWait;

var currentCard; 
var currentCardId;
var currentCardNum;
var compareCard;
var compareCardId; 
var compareCardNum;

var yourMatchIndex;

var compCardsInHand;
var compCardIndex;
var compCardId;

var cardsInDeck;

//var matchesInHand;



// BUILD DECK AUTOMATICALLY


var numberOption =["Ace","2","3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"];
var suitOption = ["spades", "clubs", "diamonds", "hearts"];
var deck = [];

for (j = 0; j < numberOption.length; j++) {
	for(var i = 0; i < suitOption.length; i++)  {
	    deck.push(
	    	{"cardNumber": numberOption[j], "cardSuit": suitOption[i], "cardId": suitOption[i] + numberOption[j], "uiElement": '$("' + suitOption[i] + numberOption[j] + '")'   }
	    );
	}
}


$(document).ready(function(){

// DEALING AND DRAWING CARDS 

	// SELECT RANDOM CARD FROM DECK
	function selectRandomCard() {
		console.log('selectRandomCard firing');
		randomIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		randomCard = deck[randomIndex];
		deck.splice(randomIndex, 1);
		console.log('random card: ' + randomCard.cardId);
	}


// DEAL CARD TO USER/COMP

	function dealUser() {
		console.log('dealUser firing');
		selectRandomCard();
		addCardToUserHandUI(randomCard);
		cardsInDeck = deck.length;
		console.log('CARDS IN DECK: ' + cardsInDeck);
	}

	function dealComp() {
		console.log('dealComp firing');
		selectRandomCard();
 		addCardToCompHandUI(randomCard);
 		cardsInDeck = deck.length;
		console.log('CARDS IN DECK: ' + cardsInDeck);
	}

// CLICK DEAL BUTTON TO INITIATE DEAL & INITIAL MATCHING

	$("#dealButton").click(function() {
		$('#dealButton').hide();
		var i = 0;
		while (i < 7) {
			dealUser();
			dealComp();
			i++;
		}

		$('#messageBox').text("Let's get started by seeing if there are any matches already!");
				
		userStartWait = setTimeout(function() {
			checkForMatch('userHandUI');
		}, 2000);

	});

// CHECK FOR MATCHES IN HAND

function checkForMatch(hand) {
	console.log('checkForMatch for ' + hand + ' firing');
	clearTimeout(userStartWait);
	clearTimeout(compStartWait);
	var checkHandDiv = "#" + hand + " div";
	var checkHand = '#' + hand;
	var checkHandVar = hand;
	console.log('checkHandDiv, var made in checkForMatch: ' + checkHandDiv);
	
	for (i = 1; i < $(checkHandDiv).length + 1; i++) {
		currentCard = $('#' + checkHandVar + ' :nth-child(' + i + ')'); 
		currentCardId = currentCard.attr('id');
		currentCardNum = currentCard.attr('data-number');
		
		console.log('data num: ' + currentCard.attr('data-number'));
		console.log('this is the current card: ' + currentCard);

		for (j = 1; j < $('#' + checkHandVar + ' div').length + 1; j++) {
			if (j == i) {
				console.log('hit current card in check loop <br> i=' + i + ' j=' + j);
			}
			else {
				//console.log('hit different card in check loop <br> i=' + i + ' j=' + j);
				compareCard = $('#' + checkHandVar + ' :nth-child(' + j + ')');
				compareCardId = compareCard.attr('id');
				compareCardNum = compareCard.attr('data-number');
				console.log('compare card: ' + compareCardNum);
				
				//MAKE SURE THREE CARDS NOT SELECTED
				if (currentCardNum == compareCardNum && $('.preMatch.' + currentCardNum).length < 2) {
					$('#' + currentCardId).addClass('preMatch');
					$('#' + compareCardId).addClass('preMatch');
				}	
			}
		}
	}


// PREGAME ONLY: CHECKS TO SEE IF MATCHES EXIST, THEN FILES MATCHES IF COMP, OR SHOWS FILE BUTTON IF USER

	var matchesInHand = $('#' + checkHandVar + ' .preMatch').index();
		console.log('matches in hand: ' + matchesInHand);

	if (hand == 'userHandUI') {
		console.log('this is a user hand');
	
		if (matchesInHand == -1) {
			$('#messageBox').text("Bummer, looks like you don't have any matches yet. Let's see if the computer does...");
			compStartWait = setTimeout(function() {
				checkForMatch('compHandUI');
			}, 1500);
		}
		else {
			$('#messageBox').text('Jawesome! You already have matches! File them away!');
			$('#fileMatchesButton').show();
		}
	}

	else if (hand == 'compHandUI') {
		console.log('this is a computer hand');
		$('#compMatches').append($('#compHandUI .preMatch'));
		$('#compMatches .preMatch').removeClass('preMatch');
		compDivLength = $('#compMatches div').length;
		console.log(compDivLength);
		$('#computerScore').text(compDivLength/2);
		
		if (compDivLength/2 == 1) {
			$('#messageBox').text('Computer found ' + compDivLength/2 + ' match.');
		}
		else {
			$('#messageBox').text('Computer found ' + compDivLength/2 + ' matches.');
		}	

		var startGameWait = setTimeout(function(){
			$('#messageBox').text('Start the game by selecting a card in your hand to ask the computer for.');
		}, 2000);	
	}
}

// FILE MATCHES BUTTON CLICKED AT START

	$('#fileMatchesButton').click(function() {
		$('#fileMatchesButton').hide();
		clearTimeout(userStartWait);
		$('#messageBox').empty();
		$('#stuff').append($('#userHandUI .preMatch'));
		$('#stuff .preMatch').removeClass('preMatch');
		stuffDivLength = $('#stuff div').length;
		console.log(stuffDivLength);
		$('#userScore').text(stuffDivLength/2);

		compStartWait = setTimeout(function() {
			checkForMatch('compHandUI');
		}, 1000);
	});




// ADD NEW CARD FROM DECK TO USER HAND

	function addCardToUserHandUI(card) {
		console.log('addCardToUserHandUI firing');
		newCardID = card.cardSuit + card.cardNumber;	
		$("#userHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '"></div>');
		$('#' + newCardID).addClass('card faceUp cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
		
		// IN CASE YOU GO FISH A MATCH 
		//(was originally going to combine with checkformatch, but got messy - might try later)
		if (deck.length < 38) {

			for (i = 1; i < $('#userHandUI div').length - 1; i++) {
				currentCard = $('#userHandUI :nth-child(' + i + ')'); 
				currentCardId = currentCard.attr('id');
				currentCardNum = currentCard.attr('data-number');

				if (card.cardNumber == currentCardNum && newCardID !== currentCardId) {
					$('#messageBox').text('Hey, you drew a match anyway! Great job!');
					$('#stuff').append($('#' + currentCardId));
					$('#stuff').append($('#' + newCardID));
					$('#userScore').text($('#stuff div').length/2);
				}
				else {
					console.log('drew a regular card that doesnt match shit in your hand');
				}
			}
		}
		else {
			console.log('at start of game - should not be condition');
		}
	}


// ADD NEW CARD FROM DECK TO COMPUTER HAND
	
	function addCardToCompHandUI(card) {
		console.log('addCardToCompHandUI firing');
		newCardID = card.cardSuit + card.cardNumber;
		$("#compHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '"></div>');
		$('#' + newCardID).addClass('card faceDown cardInHand ' + card.cardSuit + ' ' + card.cardNumber);

		// IN CASE COMPUTER FISHES A MATCH 
		//(was originally going to combine with checkformatch, but got messy - might try later)
		if (deck.length < 38) {

			for (i = 1; i < $('#compHandUI div').length - 1; i++) {
				currentCard = $('#compHandUI :nth-child(' + i + ')'); 
				currentCardId = currentCard.attr('id');
				currentCardNum = currentCard.attr('data-number');

				if (card.cardNumber == currentCardNum && newCardID != currentCardId) {
					$('#messageBox').text('Woahhh - computer drew a match.');	

					var compDelay2 = setTimeout(function() {
						$('#messageBox').text('Your turn!');
						$('#compMatches').append($('#' + currentCardId));
						$('#compMatches').append($('#' + newCardID));
						$('#computerScore').text($('#compMatches div').length/2);						
					}, 2000);

				}
				else {
					console.log('just a regular card that doesnt match anything in your hand');
				}
			}


		}
		else {
			console.log('at start of game - should not be condition');
		}
	}


// USER TURN

	// USER SELECTS CARD FROM THEIR HAND TO ASK ABOUT

		$(document).on('click', '.faceUp', function (){
			console.log('clicked card firing');
			$('#askButton').show();

			cardRefUI = $(this).attr('id');
			cardRefNum = $(this).attr('data-number');
			console.log('card ref ui: ' + cardRefUI + 'card ref num: ' + cardRefNum);

			// deselects card if same card is clicked

			if ($(this).hasClass("selectedCard")) {
				console.log('same card');
				$(this).removeClass("selectedCard");
				$('#askButton').hide();
			}

			// ensures that only one card selected at a time (switches cards)

			else if ($('#userHandUI .selectedCard').length > 0) {
				$('.card').removeClass('selectedCard');
				$(this).addClass('selectedCard');	
			}

			else {
				$(this).addClass('selectedCard');
			}
			
		});


// USER CLICKS ASK BUTTON

	$("#askButton").click(function() {
		$('#askButton').hide();
		$('.selectedCard').removeClass('selectedCard').addClass('asking');
		cardRefUI = $('.asking').attr('id');
		cardRefNum = $('.asking').attr('data-number');
		console.log('asking about: ' + cardRefUI + ' & ' + cardRefNum);


		// FIND CARD IN COMPUTER HAND THAT MATCHES CARD SELECTED 

		var matchIndex = $('#compHandUI > div').index($('div[data-number|=' + cardRefNum + ']'));
		console.log('index of matching card in comp hand: ' + matchIndex);

		if (matchIndex > -1) {
			console.log('match!');
			var matchId = $('#compHandUI :nth-child(' + (matchIndex + 1) + ')').attr('id');
			var matchDiv = $('#' + matchId);
			stuffDivLength = $('#stuff div').length;
			console.log('match div: ' + matchDiv);
			
			//SEND TO MATCHBOX
			$('#stuff').append( $('#' + matchId) );
			$('#stuff').append( $('#' + cardRefUI) );
			$('#stuff').append('<br>'); // TODO separator


 			if ($('#userHandUI div').length == 0) {
		 		$('#messageBox').text("Ack! You found a match, but now you're out of cards! Here's another one... Go again!");
		 	
			 	var noCardsDrawDelay = setTimeout(function() {
					dealUser();
				}, 1000);	
			 }
			 else {
				var matchWait = setTimeout(function() {
					$('#messageBox').text('You got a match! Go again!');
				}, 500);
			}
		}

		

		else {
			$('#messageBox').text('Sorry, no ' + cardRefNum + 's. Go fish!');
			$('#goFishButton').show();
		}		

		$(".asking").removeClass('asking');
		$("#userScore").text($('#stuff div').length/2);
	});


// USER CLICKS 'GO FISH BUTTON'

		$("#goFishButton").click(function() {
			$('#goFishButton').hide()
			$('#messageBox').text("computer's turn");
			dealUser();		
			
			// DELAY AFTER DRAW, THEN START COMPUTER TURN
			compTurnWait = setTimeout(function() {
				computerTurn();
			}, 2000);
		});


// USER CLICKS BUTTON TO MAKE COMPUTER GO FISH

		$('#compFishButton').click(function() {
		 	
		 	$('#compHandUI .faceUp').removeClass('compSelected faceUp matched').addClass('faceDown');
		 	$('#messageBox').text('Your turn! Select card and hit ask');
		 	console.log('select random card firing from compFishButton');
		 	console.log('computer selected: ' + randomCard.cardNumber + ' of ' + randomCard.cardSuit);
		 	dealComp();
		 	$('#compFishButton').hide();
		 	return 'break here?'; // just added

		 	// if ($('#compHandUI div').length == 0) {
			 // 	$('#messageBox').text("Ack! Computer's out of cards, need to draw one...");
			 	
			 // 	var noCardsDrawDelay = setTimeout(function() {
				// 	dealComp();
				// 	computerTurn();
				// }, 1000);	
			 // }
			 // else {
			 // 	computerTurn();
			 // }



		 });


// COMPUTER TURN

	 function computerTurn() {
	 	console.log('computer turn firing');
	 	clearTimeout(compTurnWait);


	 // COMP CHOOSES CARD TO ASK
	 	compCardsInHand = $('#compHandUI div').length;
	 		console.log('# of cards in comp hand: ' + compCardsInHand);
	 	compCardIndex = Math.floor((Math.random() * compCardsInHand) + 1);
	 		console.log('comp card index: ' + compCardIndex);
	 	compCardId = $('#compHandUI :nth-child(' + (compCardIndex) + ')').attr('id');
	 		console.log('compcardid: ' + compCardId);
	 		

	 // COMPUTER ASKS FOR CARD (& card displayed in hand)
	 	$('#' + compCardId).addClass('faceUp compSelected').removeClass('faceDown');
	 	$('#messageBox').text('Do you have any ' + $('#' + compCardId).attr('data-number') + "s?");

	 	var compCardNum = $('.compSelected').attr('data-number');	
	 	console.log('compcardnum: ' + compCardNum);


	 // CHECK IF CARD IS IN YOUR HAND
	 	yourMatchIndex = $("#userHandUI ." + compCardNum).index()	
	 	console.log('your match index: ' + yourMatchIndex);
	 	
	 	if (yourMatchIndex == -1) {	
	 		//$('#messageBox2').text('Nope! Tell computer to go fish.'); <-- coming back to these (p3)
	 		$('#compFishButton').show(); // displays 'go fish, computer' button	 	
	 	}	

	 	else {
	 		$('#giveCardsButton').show();
	 		$('#userHandUI .' + compCardNum).addClass('gotcha');
	 	}
	 }

// USER CLICKS BUTTON TO FORFEIT MATCHING CARD

 	$('#giveCardsButton').click(function() {
 		$('#' + compCardId).removeClass('compSelected');
 		$('.card').removeClass('gotcha');
 		$('#messageBox').empty();

 		var compMatchId = $('#userHandUI :nth-child(' + (yourMatchIndex + 1) + ')').attr('id');
		var compMatchDiv = $('#' + compMatchId);
		
		// SEND TO MATCH BOX
		$('#compMatches').append( $('#' + compMatchId) );
		$('#compMatches').append( $('#' + compCardId) );
		$('#compMatches').append('<br>'); // TODO separator

		// UPDATE COMPUTER SCORE
		var compMatchesDivLength = $('#compMatches div').length;
		$("#computerScore").text(compMatchesDivLength / 2);

		// ADD MATCH CLASS // TODO - style these for match box
					//$('#' + compMatchId).addClass('matched');
					//$('#' + compCardId).addClass('matched').removeClass('asking');

		$('#giveCardsButton').hide();
		
		// RESET FOR NEXT TURN
		// compCardsInHand = null;
		// compCardIndex = null;
		// compCardId = null;
		// compMatchId = null;
		// compMatchDiv = null;

		//$('#' + compCardId').addClass('faceDown');
		//$('#' + compHandUI + '.card').removeClass('compSelected matched');
 		$('#messageBox2').empty(); //TODO - message - your turn?
 		$('#messageBox').text('Your turn! Select card and hit ask');

 		//COMP GOES AGAIN BECAUSE VICTORY
 		
 		// IF COMPUTER JUST MATCHED LAST CARDS AND IS OUT
 		if ($('#compHandUI div').length == 0) {
		 	$('#messageBox').text("Ack! Computer's out of cards, need to draw one...");
		 	
		 	var noCardsDrawDelay = setTimeout(function() {
				dealComp();
				computerTurn();
			}, 1000);	
		 }
		 else {
		 	computerTurn();
		 }
 			

 	});


// WIN CONDITIONS
// deck with no cards
if (deck.length == 0) {
	$('#drawCard').hide();
};




});

// TOGGLE FUNCTION
    $('#expandIcon').click(function(){
        $('#matchContainer').toggle("blind", 1000);
        $('#expandIcon').hide();
        $('#retractIcon').show();
    });

    $('#retractIcon').click(function(){
        $('#matchContainer').toggle("blind", 1000);
        $('#retractIcon').hide();
        $('#expandIcon').show();
    });

//NOTES
//$('#userHandUI > div').index($( "div[data-number|='7']" ))