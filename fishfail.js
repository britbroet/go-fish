	$("#askButton").click(function() {
		$('.selectedCard').removeClass('selectedCard').addClass('asking');
		cardRefUI = $('.asking').attr('id');
		console.log(cardRefUI);

		// find card in user hand array that corresponds with card selected 
		for (i = 0; i < userHand.length; i++) {
			if (cardRefUI == userHand[i].cardRef) {
				
				// variable askedCard is the array object for the selected card
				var askedCard = userHandArray[i];
				
				// function to see if anything in comp hand has same number value
				
				for (j = 0; j < computerHandArray.length; j++) {
					if (askedCard.cardNumber == computerHandArray[j].cardNumber) {
						matchingCard = computerHandArray[j];	
						console.log('match!!!' + "comp card: " + computerHandArray[j].cardRef);
						matchId = matchingCard.cardRef;
						document.getElementById(matchingCard.cardRef).remove();

						//UPDATE USER MATCHES & HAND ARRAYS
						userHandArray.splice(i, 1);
						userMatches.push(askedCard);
						computerHandArray.splice(j, 1);
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




	//// PREVIOUS FAILTIME


	// $("#askButton").click(function() {
										// 	turn = turn++;

										// 	// find div ID of card in play
										// 	console.log('card ref ui now: ' + cardRefUI);

										// 	// ADD IN PLAY ('ASKING') CLASS
										// 	$('#' + cardRefUI).addClass('asking').removeClass('selectedCard');
										// 	console.log('selected cards array: ' + selectedCardsArray);


										// 	// find card in user hand array that corresponds with card selected 
										// 	for (var i = 0; i < userHandArray.length; i++) {
										// 		if (cardRefUI == userHandArray[i].cardId) {

										// 			console.log('found it');
																	
										// 			// function to see if anything in comp hand has same number value				
										// 			for (var j = 0; j < compHandArray.length; j++) {
										// 				if (userHandArray[i].cardNumber == compHandArray[j].cardNumber) {  
										// 					console.log('match!');
															
										// 					// matchUpdateArrays(compHandArray, j, userMatches); NOTE/QUESTION: cant make function bc wont take j & i?
										// 					// matchUpdateArrays(compHandArray, i, userMatches);

										// 					var compRefUI = compHandArray[j].cardId;
										// 					$('#' + compRefUI).addClass('match'); // TODO: after stall

										// 					//UPDATE ARRAYS
										// 					userMatches.push(compHandArray[j]);
										// 					compHandArray.splice(j, 1);
										// 					userMatches.push(userHandArray[i]);
										// 					userHandArray.splice(i, 1);

										// 					$('#' + cardRefUI).removeClass('asking');
										// 				}
										// 				else {
										// 					console.log('not a match');
										// 				}

										// 			}

													
										// 		// IF MATCHES FOUND
										// 		if (userMatches.length > (0 + turn)) {
										// 			console.log('you found a match!');
										// 			$('.match').remove();
										// 			$('.asking').remove();
										// 			$('messageBox').text('You found a match!');
										// 			$("#userScore").append('Your Total Matches: ' + userMatches.length/2);
										// 		}
										// 		else {
										// 			$("#messageBox").text('No matches. Go fish!');
										// 		}	


					// if (askedCard.cardNumber == computerHand[j].cardNumber) {
					// 	matchingCard = computerHand[j];	
					// 	console.log('match!!!' + "comp card: " + computerHand[j].cardRef);
					// 	matchId = matchingCard.cardRef;
					// 	document.getElementById(matchingCard.cardRef).remove();

					// 	//UPDATE USER MATCHES & HAND ARRAYS
					// 	userHand.splice(i, 1);
					// 	userMatches.push(askedCard);
					// 	computerHand.splice(j, 1);
					// 	userMatches.push(matchingCard);
					// 	$("#userScore").append('Your Total Matches: ' + userMatches.length/2);
					// 	$(".asking").remove();
					// }

					// else {
					// 	//$("#messageBox").text('not a match'); //TODO add message area (no matches)
					// }

				
	// 		}
	// 	}
	// });


	// ------------------------- BEFORE COMP/USER FUNCTION SWITCH: INITIAL MATCHING:

	

	/// check for match

// function checkForMatch() {
// 	for (i = 1; i < $('#userHandUI div').length + 1; i++) {
// 		currentCard = $('#userHandUI :nth-child(' + i + ')'); 
// 		currentCardId = currentCard.attr('id');
// 		currentCardNum = currentCard.attr('data-number');
// 		console.log('data num: ' + currentCard.attr('data-number'));
// 		console.log('this is the current card: ' + currentCard);

// 		for (j = 1; j < $('#userHandUI div').length + 1; j++) {
// 			if (j == i) {
// 				console.log('hit current card in check loop <br> i=' + i + ' j=' + j);
// 			}
// 			else {
// 				console.log('hit different card in check loop <br> i=' + i + ' j=' + j);
// 				compareCard = $('#userHandUI :nth-child(' + j + ')');
// 				compareCardId = compareCard.attr('id');
// 				compareCardNum = compareCard.attr('data-number');
// 				console.log('compare card: ' + compareCardNum);
				
// 				if (currentCardNum == compareCardNum) {
// 					$('#' + currentCardId).addClass('preMatch');
// 					$('#' + compareCardId).addClass('preMatch');
// 				}	
// 			}
// 		}
// 	}
// 	var matchesInHand = $("#userHandUI .preMatch").index();
// 		console.log('matches in hand: ' + matchesInHand);
	
// 	if (matchesInHand == -1) {
// 		$('#messageBox').text('No initial matches found - select a card to ask for!')
// 	}
// 	else {
// 		$('#messageBox').text('Jawesome! You already have matches! File them away!');
// 		$('#fileMatchesButton').show();
// 	}
// }