
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

/*
let player1 = ['x'];
let player2 = ['o'];
*/

let players = ['x', 'o'];

let currentPlayer;
let available = [];

function setup() {
    createCanvas(600, 600);
    frameRate(1);//--------------------------------------------------------------------> Frame Rate
    currentPlayer = floor(random(players.length));

    /*
      if (random(1) < 0.5) {
      currentPlayer = player1;
    } else{
    currentPlayer = player2;
    }
    */

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            available.push([i, j]);
        }
    }
}
//-------------------------------------------------------------------------------> check funktion
function equals3(a, b, c) {
    return (a == b && b == c && a != '');
}

function checkWinner() {
    let winner = null;

    //horizontaler check
    for (let i = 0; i < 3; i++) { //i = Reihe
        if (equals3(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        }
    }

    //vertikaler check
    for (let i = 0; i < 3; i++) { //i = Spalte
        if (equals3(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }

    //diagonaler check
    if (equals3(board[0][0], board[1][1], board[2][2])) {
        winner = board[0][0];
    }

    if (equals3(board[2][0], board[1][1], board[0][2])) {
        winner = board[2][0];
    }


    if (winner == null && available.lenghth == 0) {
        return 'tie';
    } else {
        return winner;
    }

}

function nextTurn() {
    let index = floor(random(available.length));
    let spot = available.splice(index, 1)[0];
    let i = spot[0];
    let j = spot[1];
    board[i][j] = players[currentPlayer];
    currentPlayer = (currentPlayer + 1) % players.length;
}

/*function mousePressed() {
nextTurn();
}
*/

function draw() {
    background(255);
    let w = width / 3;
    let h = height / 3;
    strokeWeight(10);


    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);


    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let = x = w * i + w / 2;
            let = y = w * j + h / 2;
            let spot = board[i][j];
            textSize(120);
            textAlign(CENTER, CENTER);
            if (spot == players[0]) {
                text(spot, x, y);
            } else if (spot == players[1]) {
                text(spot, x, y);
            }
        }
    }


    let result = checkWinner();
    if (result != null) {
        noLoop();
        console.log(result);
    }

    nextTurn();

}