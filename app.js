/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


let scores, roundScore, activePlayer, gamePlaying;

/*
dice = Math.floor(Math.random() * 6) + 1; //created a random number

//DOM manipulation in two ways
document.querySelector('#current-' + activePlayer).textContent = dice; //textContent will only be manipulated only for text.active
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'; //textContent will only be manipulated only for text.active
*/

init();

// event listener for roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. random number
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. display the result
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. update the round score if the rolled number was not 1
        if (dice !== 1) {
            // add score
            roundScore += dice; //same as (roundScore = roundScore + dice;)
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
    }

});

//Hold button eventlistener
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {
        //add current score to main score
        scores[activePlayer] += roundScore;

        //update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if player won the game
        if (scores[activePlayer] >= 10) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';

            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;

        } else {
            //Next player
            nextPlayer();
        }
    }
});

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // ternary operator for is else statement
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //toggled active class whenever player changed
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    document.querySelector('.dice').style.display = 'none';

    // made every score to zero
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}