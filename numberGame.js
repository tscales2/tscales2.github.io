var computerGuess;
var userGuessLog = [];
var attempts = 0;
var maxGuesses = 20;
var score = 0;

function gameEnded() {
    document.getElementById('newGameButton').style.display = 'inline';
    document.getElementById('easyBtn').style.display = 'none';
    document.getElementById('hardBtn').style.display = 'none';
    document.getElementById('inputBox').setAttribute('readonly', 'readonly');
}

if (attempts == 1) {
    score = 100;
} else if (attempts == 2) {
    score = 90;
} else if (attempts == 3) {
    score = 80;
} else if (attempts == 4) {
    score = 70;
} else if (attempts == 5) {
    score = 60;
} else if (attempts == 6) {
    score = 50;
} else if (attempts == 7) {
    score = 40;
} else if (attempts == 8) {
    score = 30;
} else if (attempts == 9) {
    score = 20;
} else if (attempts == 10) {
    score = 10;
} else if (attempts == 11) {
    score = 9;
} else if (attempts == 12) {
    score = 8;
} else if (attempts == 13) {
    score = 7;
} else if (attempts == 14) {
    score = 6;
} else if (attempts == 15) {
    score = 5;
} else if (attempts == 16) {
    score = 4;
} else if (attempts == 17) {
    score = 3;
} else if (attempts == 18) {
    score = 2;
} else if (attempts == 19) {
    score = 1;
} else {
    score = 0;
}


function easyMode() {
    maxGuesses = 20;
    document.getElementById('easyBtn').className = 'activeButton';
    document.getElementById('hardBtn').className = '';
}

function hardMode() {
    maxGuesses = 10;
    document.getElementById('hardBtn').className = 'activeButton';
    document.getElementById('easyBtn').className = '';
}

function newGame() {
    window.location.reload();
}

function init() {
    computerGuess = Math.floor(Math.random() * 1000 + 1);
    // console.log(computerGuess);

    document.getElementById('newGameButton').style.display = 'none';
}

function compareGuess() {
    var userGuess = " " + document.getElementById('inputBox').value;
    // console.log(userGuess);

    userGuessLog.push(userGuess);
    // console.log(userGuessLog);
    document.getElementById('guessLog').innerHTML = userGuessLog;

    attempts++;
    document.getElementById('attempts').innerHTML = attempts;


    if (userGuessLog.length < maxGuesses) {
        if (userGuess > computerGuess) {
            document.getElementById('textOutput').innerHTML = 'Your guess is too high';
            document.getElementById('inputBox').value = "";
        } else if (userGuess < computerGuess) {
            document.getElementById('textOutput').innerHTML = 'Your guess is too low';
            document.getElementById('inputBox').value = "";
        } else {
            document.getElementById('textOutput').innerHTML = 'Correct! you got it in ' + attempts + ' attempts';
            document.getElementById('score').innerHTML = score;

            document.getElementById('container').style.backgroundColor = 'green';
            gameEnded();
        }
    } else {
        if (userGuess > computerGuess) {
            document.getElementById('textOutput').innerHTML = 'You lose!' + '<br> the number was ' + computerGuess;
            document.getElementById('container').style.backgroundColor = '#e82c4e';
            gameEnded();
        } else if (userGuess < computerGuess) {
            document.getElementById('textOutput').innerHTML = 'You lose!' + '<br> the number was ' + computerGuess;
            document.getElementById('container').style.backgroundColor = '#e82c4e';
            gameEnded();
        } else {
            document.getElementById('textOutput').innerHTML = 'Correct! you got it in ' + attempts + ' attempts';
            document.getElementById('score').innerHTML = score;
            document.getElementById('container').style.backgroundColor = 'green';
            gameEnded();
        }
    }


}
