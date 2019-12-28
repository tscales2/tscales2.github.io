var computerGuess;
var userGuessLog = [];
var attempts = 0;
var maxGuesses = 20;

function wordsToChoose(){
    var userGuess = " " + document.getElementById('inputBox').value;
    document.getElementById('inputBox').value = "";
    pickAWord(userGuess);
    
}
function newGame() {
    window.location.reload();
}
function gameEnded() {
    document.getElementById('newGameButton').style.display = 'inline';
    document.getElementById('inputBox').setAttribute('readonly', 'readonly');
}
function compareTheWords(){
    
}
function pickAWord(userGuess){
    var guessWord = userGuess;
    switch(guessWord){
        case 'A':
            document.getElementById('textOutput').innerHTML = 'you picked words starting with a';
        case 'B':
            document.getElementById('textOutput').innerHTML = 'you picked words starting with b';
        case 'C':
            document.getElementById('textOutput').innerHTML = 'you picked words starting with c';
    }
}