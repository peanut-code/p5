
let spielfeld = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
];

let w;
let h;

let computer = 'X';
let ich = 'O';
let aktuellerSpieler = ich;
let resultP;

function setup() {
    createCanvas(400, 400);
    w = width / 3;
    h = height / 3;
}

function equals3(a, b, c) {
    return (a == b && b == c && a != '');
}

function findeGewinner() {
    let gewinner = null;

    // horizontale =)
    for (let i = 0; i < 3; i++) {
        if (equals3(spielfeld[i][0], spielfeld[i][1], spielfeld[i][2])) {
            gewinner = spielfeld[i][0];
        }
    }

    // vertikale ^^*
    for (let i = 0; i < 3; i++) {
        if (equals3(spielfeld[0][i], spielfeld[1][i], spielfeld[2][i])) {
            gewinner = spielfeld[0][i];
        }
    }

    // Diagonal \(^_°)/
    if (equals3(spielfeld[0][0], spielfeld[1][1], spielfeld[2][2])) {
        gewinner = spielfeld[0][0];
    }
    if (equals3(spielfeld[2][0], spielfeld[1][1], spielfeld[0][2])) {
        gewinner = spielfeld[2][0];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (spielfeld[i][j] == '') {
                openSpots++;
            }
        }
    }


    if (gewinner == null && openSpots == 0) {
        return 'tie';
    } else {
        return gewinner;
    }

}

// function nextTurn() {
//     let index = floor(random(avcomputerlable.length));
//     let spot = avcomputerlable.splice(index, 1)[0];
//     let i = spot[0];
//     let j = spot[1];
//     spielfeld[i][j] = players[aktuellerSpieler];
//     aktuellerSpieler = (aktuellerSpieler + 1) % players.length;
// }

function mousePressed() {
    if (aktuellerSpieler == ich) {
        //der Spieler macht seinen Zug
        let i = floor(mouseX / w);
        let j = floor(mouseY / h);
        //wenn der der Spielzug valide ist...
        if (spielfeld[i][j] == '') {
            spielfeld[i][j] = ich;
            aktuellerSpieler = computer;
            //...soll die computer den nächsten Spielzug machen
            let avcomputerlable = [];
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    if (spielfeld[k][l] == '') {
                        avcomputerlable.push({ k, l });
                    }
                }
            }
            let move = random(avcomputerlable);
            spielfeld[move.k][move.l] = computer;
            aktuellerSpieler = ich;
        }
    }
}

function draw() {
    background(255);
    strokeWeight(4);

    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            let x = w * i + w / 2;
            let y = h * j + h / 2;
            let spot = spielfeld[i][j];
            textSize(32);
            let r = w / 4;
            if (spot == ich) {
                noFill();
                ellipse(x, y, w / 2);
            } else if (spot == computer) {
                line(x - r, y - r, x + r, y + r);
                line(x + r, y - r, x - r, y + r);
            }

        }
    }

    let result = findeGewinner();
    if (result != null) {
        noLoop();
        let resultP = createP('');
        resultP.style('font-size', '32pt');
        if (result == 'tie') {
            resultP.html("Patt! =)")
        } else {
            resultP.html(`${result} hat gewonnen!`);
        }
        noLoop();
    }
}
