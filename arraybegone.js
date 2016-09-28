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
var cardRefUI; //ID of card in play
var cardRefNum;
var turn = 0;

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
		randomIndex = Math.floor((Math.random() * deck.length - 1) + 1);
		//console.log('randomIndex: ' + randomIndex);
		randomCard = deck[randomIndex];
		deck.splice(randomIndex, 1);
		//console.log(newCard);
	}


// DEAL

	function dealUser() {
		selectRandomCard();
		addCardToUserHandUI(randomCard);
	}

	function dealComp() {
		selectRandomCard();
 		addCardToCompHandUI(randomCard);
	}


	$("#dealButton").click(function() {
		var i = 0;
		while (i < 7) {
			dealUser();
			dealComp();
			i++;
		}

		// // INITIAL MATCHING
		
		// $(document).on('click', '.preGame', function (){
		// 	$(this).addClass('preMatchCard');	
		// });


	});


	// NEW CARD ADDED TO USER HAND

	function addCardToUserHandUI(card) {
		newCardID = card.cardSuit + card.cardNumber;
		$("#drawnCardUI").empty();	
		$("#userHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '">' + card.cardNumber + '<br>' + card.cardSuit + '</div>');
		$('#' + newCardID).addClass('card faceUp cardInHand preGame ' + card.cardSuit + ' ' + card.cardNumber);
		// tried adding on click function here but not working
	}


	// NEW CARD ADDED TO COMPUTER HAND
	
	function addCardToCompHandUI(card) {
		newCardID = card.cardSuit + card.cardNumber;
		$("#drawnCardUI").empty();
		$("#compHandUI").append('<div id="' + newCardID + '" data-suit="' + card.cardSuit + '" data-number="' + card.cardNumber + '"><p class="tempCompCardStyle">'  + card.cardNumber + '<br>' + card.cardSuit +  '</p></div>');
		$('#' + newCardID).addClass('card faceDown cardInHand ' + card.cardSuit + ' ' + card.cardNumber);
	}

// TODO: add pause when card drawn





	

// USER TURN

	// USER SELECTS CARD FROM THEIR HAND TO ASK ABOUT

		$(document).on('click', '.faceUp', function (){
			console.log('clicked card');

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
		selectRandomCard();
		$("#drawnCard").append('<div class="card faceUp">' + randomCard + '</div>'); //draw stage TODO
		addCardToUserHandUI(randomCard);
	}


	//CLICK ASK BUTTON

	$("#askButton").click(function() {

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
			var stuffDivLength = $('#stuff div').length;
			// $("#userScore").append('Your Total Matches: ' + stuffDivLength/2);
			console.log(matchDiv);
			
			//SEND TO MATCHBOX
			$('#stuff').append( $('#' + matchId) );
			$('#stuff').append( $('#' + cardRefUI) );
			$('#stuff').append('<br>'); // TODO separator

			//ADD MATCH CLASS
			//$('#' + matchId).addClass('matched');
			//$('#' + cardRefUI).addClass('matched').removeClass('asking');
			$('#' + cardRefUI).removeClass('asking');
		}

		else {
			console.log('no match!');
		}



		

		//$(".asking").removeClass('asking');
		$("#userScore").text($('#stuff div').length/2);
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



// COMPUTER TURN


	 function computerTurn() {
	 	
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
	 		$('#messageBox2').text('Nope!');
	 		$('#compFishButton').show();


	 		// TELL COMP TO FUCK OFF 

		 	$('#compFishButton').click(function() {
		 		$('#compHandUI .card').removeClass('compSelected faceUp matched').addClass('faceDown');
		 		$('#messageBox2').empty(); //TODO - message - your turn?
		 		$('#messageBox').text('Your turn! Select card and hit ask');
		 		selectRandomCard();
		 		//$("#computerDrawnCard").append('<div class="card faceDown"><p class="tempCompCardStyle">' + randomCard + '</p></div>'); TODO - drawn card animation
		 		console.log('computer selected: ' + randomCard.cardNumber + ' of ' + randomCard.cardSuit);
		 		addCardToCompHandUI(randomCard);
		 		$('#compFishButton').hide();
		 	});

	 	}	
	 	else {
	 		$('#messageBox2').text('Yep!');
	 		$('#giveCardsButton').show();

	 		// HAND OVER CARD
		 	$('#giveCardsButton').click(function() {
		 		$('#' + compCardId).removeClass('compSelected');
		 		$('#messageBox2').empty();
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


	

