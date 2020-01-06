let scores, roundScore, activePlayer, gamePlaying;

init();
let lastDice;

// event listener for roll dice button
document.querySelector('.btn-roll').addEventListener('click', function () {

    if (gamePlaying) {
        // 1. random number
        let dice1 = Math.floor(Math.random() * 7) + 1;
        let dice2 = Math.floor(Math.random() * 7) + 1;

        // 2. display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. update the round score if the rolled number was not 1
        if (dice1 !== 7 && dice2 !==7) {
            // add score
            roundScore += dice1 + dice2; //same as (roundScore = roundScore + dice;)
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }


        /*
        if (dice === 6 && lastDice === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        if (dice !== 1) {
            // add score
            roundScore += dice; //same as (roundScore = roundScore + dice;)
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
        lastDice = dice;
        */
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
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!!';
            hideDice();

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

    hideDice();
}

function init() {
    gamePlaying = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    hideDice();

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
function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}