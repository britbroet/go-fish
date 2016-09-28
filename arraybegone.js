console.log('working!');

// !!!! THIS VARIABLE CALL WORKS
// $('#' + newCardID).on("click", function() {

var compHandArray = [];
var userHandArray = [];
var selectedCardsArray = [];
var inPlay = [];

var userMatches = [];
var computerMatches = [];
var stuffDivLength;
var compDivLength;

var randomCard;
var randomIndex; 
var newCardID;
var turn;
var cardRefUI; //ID of card in play
var cardRefNum;
var turn = 0;

var userStartWait;
var compStartWait;
var compTurnWait;

var currentCard; 
var currentCardId;
var currentCardNum;
var compareCard;
var compareCardId; 
var compareCardNum;
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


//$(document).ready(function(){

// DEALING AND DRAWING CARDS 

	// Randomly select card from deck  TODO: shuffle and take top?

	function selectRandomCard() {
		console.log('selectRandomCard firing');
		randomIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		randomCard = deck[randomIndex];
		deck.splice(randomIndex, 1);
		console.log('random card: ' + randomCard.cardId);
	}


// DEAL

	function dealUser() {
		console.log('dealUser firing');
		selectRandomCard();
		addCardToUserHandUI(randomCard);
	}

	function dealComp() {
		console.log('dealComp firing');
		selectRandomCard();
 		addCardToCompHandUI(randomCard);
	}


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




function checkForMatch(hand) {
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
				//break; thought might avoid inital 3-match (9/28 - noon)
			}
			else {
				console.log('hit different card in check loop <br> i=' + i + ' j=' + j);
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

	// CHECKS TO SEE IF MATCHES EXIST, THEN FILES MATCHES IF COMP, OR SHOWS FILE BUTTON IF USER
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
			$('#messageBox').text('Computer found ' + compDivLength/2 + ' match!');
		}
		else {
			$('#messageBox').text('Computer found ' + compDivLength/2 + ' matches!');
		}	

		var startGameWait = setTimeout(function(){
			$('#messageBox').text('Start game by selecting a card to ask computer for.');
		}, 3000);	
	}
}

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




	// NEW CARD ADDED TO USER HAND

	function addCardToUserHandUI(card) {
		console.log('addCardToUserHandUI firing');
		newCardID = card.cardSuit + card.cardNumber;
		//$("#drawnCardUI").empty();	
		$("#userHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '">' + card.cardNumber + '<br>' + card.cardSuit + '</div>');
		$('#' + newCardID).addClass('card faceUp cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
		console.log(randomCard.cardId);
		// tried adding on click function here but not working
	}


	// NEW CARD ADDED TO COMPUTER HAND
	
	function addCardToCompHandUI(card) {
		console.log('addCardToCompHandUI firing');
		newCardID = card.cardSuit + card.cardNumber;
		//$("#drawnCardUI").empty();
		$("#compHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '"><p class="tempCompCardStyle">'  + card.cardNumber + '<br>' + card.cardSuit +  '</p></div>');
		$('#' + newCardID).addClass('card faceDown cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
	}

// TODO: add pause when card drawn





	

// USER TURN

	// USER SELECTS CARD FROM THEIR HAND TO ASK ABOUT

		$(document).on('click', '.faceUp', function (){
			console.log('clicked card');
			$('#askButton').show();

			cardRefUI = $(this).attr('id');
			cardRefNum = $(this).attr('data-number');
			console.log('card ref ui: ' + cardRefUI + 'card ref num: ' + cardRefNum);

			// deselects card if same card is clicked

			if ($(this).hasClass("selectedCard")) {
				console.log('same card');
				$(this).removeClass("selectedCard");
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

	
	// USER DRAWS FROM DECK (GO FISH)

	function userTurn() {
		console.log('userTurn firing');
		selectRandomCard();
		//$("#drawnCard").append('<div class="card faceUp">' + randomCard + '</div>'); //draw stage TODO
		addCardToUserHandUI(randomCard);
	}


	//CLICK ASK BUTTON

	$("#askButton").click(function() {
		$('#askButton').hide();
		$('.selectedCard').removeClass('selectedCard').addClass('asking');
		cardRefUI = $('.asking').attr('id');
		cardRefNum = $('.asking').attr('data-number');
		console.log(cardRefUI + '&' + cardRefNum);


		// find card in user hand array that corresponds with card selected 
		var matchIndex = $('#compHandUI > div').index($('div[data-number|=' + cardRefNum + ']'));
		console.log(matchIndex);

		if (matchIndex > -1) {
			console.log('match!');
			var matchId = $('#compHandUI :nth-child(' + (matchIndex + 1) + ')').attr('id');
			var matchDiv = $('#' + matchId);
			stuffDivLength = $('#stuff div').length;
			console.log(matchDiv);
			
			//SEND TO MATCHBOX
			$('#stuff').append( $('#' + matchId) );
			$('#stuff').append( $('#' + cardRefUI) );
			$('#stuff').append('<br>'); // TODO separator

			//ADD MATCH CLASS
			//$('#' + matchId).addClass('matched');
			//$('#' + cardRefUI).addClass('matched').removeClass('asking');
			$('#' + cardRefUI).removeClass('asking');

			var matchWait = setTimeout(function() {
				$('#messageBox').text('You got a match! Go again!');
			}, 500);
		}

		else {
			$('#messageBox').text('Sorry, no ' + cardRefNum + 's. Go fish!');
			$('.asking').removeClass('asking');
			// var fishWait = setTimeout(function() {
			// 	$('#messageBox').text('')
			// }, 500);
			$('#goFishButton').show();
			
			console.log('no match!');
		}



		

		//$(".asking").removeClass('asking');
		$("#userScore").text($('#stuff div').length/2);
	});


	// USER CLICKS 'GO FISH BUTTON'
		$("#goFishButton").click(function() {
			$('#goFishButton').hide()
			$('#messageBox').text('Computer turn');
			userTurn();		
			
			compTurnWait = setTimeout(function() {
				computerTurn();
			}, 1000);
		});

	// USER CLICKS 'END TURN BUTTON'
		// $("#endTurnButton").click(function() {
		// 	console.log('clicked end turn button');
		// 	computerTurn();
		// });



// COMPUTER TURN


	 function computerTurn() {
	 	
	 	clearTimeout(compTurnWait);

	 	// COMP CHOOSES CARD TO ASK
	 	var compCardsInHand = $('#compHandUI div').length;
	 		console.log(compCardsInHand);
	 	var compCardIndex = Math.floor((Math.random() * compCardsInHand) + 1);
	 		console.log('comp card index: ' + compCardIndex);
	 	var compCardId = $('#compHandUI :nth-child(' + (compCardIndex) + ')').attr('id');
	 		console.log('compcardid: ' + compCardId);
	 	//var compCardNum = $('#' + compCardId).attr('data-number');
	 		





	 	// COMPUTER ASKS FOR CARD (card revealed in hand)
	 	$('#' + compCardId).addClass('faceUp compSelected').removeClass('faceDown');
	 	$('#messageBox').text('Do you have any ' + $('#' + compCardId).attr('data-number') + "s?");

	 		 	var compCardNum = $('.compSelected').attr('data-number');	
	 			console.log('compcardnum: ' + compCardNum);


	 	// IN YOUR HAND?
	 	

		var yourMatchIndex = $("#userHandUI ." + compCardNum).index()	
	 		
	 		console.log('your match index: ' + yourMatchIndex);
	 	if (yourMatchIndex == -1) {
	 		$('#messageBox2').text('Nope! Tell computer to go fish.');
	 		$('#compFishButton').show();


	 		// TELL COMP TO FUCK OFF 

		 	$('#compFishButton').click(function() {
		 		$('#compHandUI .faceUp').removeClass('compSelected faceUp matched').addClass('faceDown');
		 		$('#messageBox').text('Your turn! Select card and hit ask');
		 		console.log('select random card firing from compFishButton');
		 		console.log('computer selected: ' + randomCard.cardNumber + ' of ' + randomCard.cardSuit);
		 		dealComp();
		 		$('#compFishButton').hide();
		 		return 'break here?'; // just added
		 	});

	 	}	
	 	else {
	 		$('#giveCardsButton').show();

	 // HAND OVER CARD

		 	$('#giveCardsButton').click(function() {
		 		$('#' + compCardId).removeClass('compSelected');
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
				compCardsInHand = null;
				compCardIndex = null;
				compCardId = null;
				compMatchId = null;
				compMatchDiv = null;

				$('#compCardId').addClass('faceDown');
				$('#compHandUI .card').removeClass('compSelected faceUp matched');
		 		$('#messageBox2').empty(); //TODO - message - your turn?
		 		$('#messageBox').text('Your turn! Select card and hit ask');

		 		//COMP GOES AGAIN

				computerTurn();

		 	});

	 	}

	 	// // HAND OVER CARD
	 	// $('#giveCardsButton').click(function() {
	 	// 	$('#' + compCardId).removeClass('compSelected');
	 	// 	$('#messageBox2').empty();
	 	// 	$('#messageBox').empty();

	 	// 	var compMatchId = $('#userHandUI :nth-child(' + (yourMatchIndex + 1) + ')').attr('id');
			// var compMatchDiv = $('#' + compMatchId);
			
			// // SEND TO MATCH BOX
			// $('#compMatches').append( $('#' + compMatchId) );
			// $('#compMatches').append( $('#' + compCardId) );
			// $('#compMatches').append('<br>'); // TODO separator

			// // UPDATE COMPUTER SCORE
			// var compMatchesDivLength = $('#compMatches div').length;
			// $("#computerScore").text(compMatchesDivLength / 2);

			// // ADD MATCH CLASS // TODO - style these for match box
			// $('#' + compMatchId).addClass('matched');
			// $('#' + compCardId).addClass('matched').removeClass('asking');

			// $('#giveCardsButton').hide();
			
			// // RESET FOR NEXT TURN
			// compCardsInHand = null;
			// compCardIndex = null;
			// compCardId = null;
			// compMatchId = null;
			// compMatchDiv = null;

			// $('#compCardId').addClass('faceDown');
			// $('#compHandUI .card').removeClass('compSelected faceUp matched');
	 	// 	$('#messageBox2').empty(); //TODO - message - your turn?
	 	// 	$('#messageBox').text('Your turn! Select card and hit ask');


			// computerTurn();

	 	// });








	 }


//});

//NOTES
//$('#userHandUI > div').index($( "div[data-number|='7']" ))


	

