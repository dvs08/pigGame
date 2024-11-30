'use strict';

//Selecting elements
const player0E1 = document.querySelector('.player--0');
const player1E1 = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//default conditions
let scores, currentScore, activePlayer, playing;  //scope 
const init = function() {

    scores = [0,0];  //final scores
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden');
    player0E1.classList.remove('player--winner');
    player1E1.classList.remove('player--winner');
    player0E1.classList.add('player--active');
    player1E1.classList.remove('player--active');
     
};

init();  // setting the inital values

const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1:0;
    player0E1.classList.toggle('player--active');
    player1E1.classList.toggle('player--active');
};


//rolling dice functionality

btnRoll.addEventListener('click', function() {

    if(playing){

        //1. Generate a random dice roll

    const dice = Math.trunc(Math.random()*6) + 1;  //0 to 5
    console.log(dice);
    //2. display dice

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;


    //3. checl for rolled 1: if true. switch to next player

    if(dice !== 1){

        //add dice to curr score
        currentScore += dice;
        
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        //current0El.textContent = currentScore;  //CHANGE LATER 

    } else{

        //switch to next player
        switchPlayer();

    }

    }

});

//holding score

btnHold.addEventListener('click', function() {

    if(playing){

        //1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

    //2. check if player's score is >=100
 
    if(scores[activePlayer] >= 100){
        //finish the game
        playing = false;
        diceEl.classList.add('hidden');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    } else{
        
        switchPlayer();
    }

    //3. if so finish game, else switch to next finish
    }
});

//reset game

btnNew.addEventListener('click',init);




