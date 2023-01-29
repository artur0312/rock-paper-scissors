let moves = ['Rock', 'Paper', 'Scissors'];



//Utility functions
function capitalize(s){
    return s.charAt(0).toUpperCase() + s.slice(1);
}

function getRandomInt(min, max){
    return Math.floor(Math.random()*(max-min +1) + min);
}

//Setup DOM
function setup(){
    //Start score

    const scoreContainer = document.querySelector("#score-container");
    scoreContainer.innerHTML = '<span id = "player-span">Player</span> <span>0 x 0</span> <span id = "ai-span">AI</span>'

    //Button functionality
    const rockBtn = document.querySelector("#rock-btn");
    const paperBtn = document.querySelector("#paper-btn");
    const scissorsBtn = document.querySelector("#scissors-btn");

    rockBtn.addEventListener('click', playMove);
    rockBtn.move = 'rock'
    paperBtn.addEventListener('click', playMove);
    paperBtn.move = 'paper';
    scissorsBtn.addEventListener('click', playMove);
    scissorsBtn.move = 'scissors';

    body = document.querySelector('body');

    const statLine = document.createElement('p');
    statLine.textContent = "Choose a move to start";
    statLine.setAttribute('id', 'stat-line');
    statLine.style.textAlign = 'center';
    body.appendChild(statLine);
}

setup();

//Game logic

function getComputerChoice(){
    let choice = getRandomInt(0,2);
    return moves[choice];
}

//Returns 0 if tie, 1 if player win, and -1 if computer wins.
function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if(playerSelection === computerSelection){
        return 0;
    }
    else if(playerSelection === 'rock'){
        if(computerSelection === 'paper')
            return -1;
        else if(computerSelection === 'scissors')
            return 1;
    }
    else if(playerSelection === 'paper'){
        if(computerSelection === 'scissors')
            return -1;
        else if(computerSelection === 'rock')
            return 1;
    }
    else if(playerSelection === 'scissors'){
        if(computerSelection === 'rock')
            return -1;
        else if(computerSelection === 'paper')
            return 1;
    }
}

function updateScore(status){
    let scoreContainer = document.querySelector('#score-container');
    let scoreSplit = scoreContainer.textContent.split(' ');
    let playerScore = parseInt(scoreSplit[1]);
    let computerScore = parseInt(scoreSplit[3]);
    if(status === 1){
        playerScore++;
    }
    else if(status === -1){
        computerScore++;
    }
    scoreContainer.innerHTML = `<span id = "player-span">Player</span> <span>${playerScore} x ${computerScore}</span> <span id = "ai-span">AI</span>`
}

function playMove(evt){
    let playerMove = evt.currentTarget.move;
    let computerMove = getComputerChoice();
    const statLine = document.querySelector("#stat-line");
    let status = playRound(playerMove, computerMove);
    if(status === 0){
        statLine.textContent = "Draw! Both played " + capitalize(playerMove) + ".";
    }
    else if(status === -1){
        statLine.textContent = "You lost! " + capitalize(computerMove) + " beats " + capitalize(playerMove) + ".";
    }
    else if(status === 1){
        statLine.textContent = "You won! " + capitalize(playerMove) + " beats " + capitalize(computerMove) + ".";
    }
    updateScore(status);
}



