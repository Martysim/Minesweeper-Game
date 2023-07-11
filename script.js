let board = [];
let rows = 8;
let columns = 8;
const icons = {
    flag: "🚩",
    Mine: "💣"
}

let minsCount = 5;
var minesLocation = [];

let tilesClicked = 0;
let flagEnabaled = false;

let gameOver = false;

window.onload = function () {
    startGame();
};

function setMines() {
    minesLocation.push("2-2");
    minesLocation.push("2-3");
    minesLocation.push("5-6");
    minesLocation.push("3-4");
    minesLocation.push("1-1");

};

function startGame() {
    document.getElementById("mines-count").innerText = minsCount;
    document.getElementById('flag-button').addEventListener('click', setFlag);
    setMines();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
    console.log(board);
};

function setFlag() {
    if (flagEnabaled) {
        flagEnabaled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    } else {
        flagEnabaled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    };

};

function clickTile() {

    let tile = this;
    if (flagEnabaled) {
        if (tile.innerText == "") {
            tile.innerText = icons.flag;
        } else if (tile.innerText == icons.flag) {
            tile.innerText = "";
        };
        return;
    };

    if (minesLocation.includes(tile.id)) {
        // alert("GAME OVER");
        gameOver = true;
        revealMines();
        return;
    };

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);

};

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = icons.Mine;
                tile.style.backgroundColor = "red"
            };
        };
    };
};

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    };

    let minesFound = 0;

    // check up
    minesFound += checkTiles(r - 1, c - 1); // left
    minesFound += checkTiles(r - 1, c); //
    minesFound += checkTiles(r - 1, c + 1); // right

    minesFound += checkTiles(r, c - 1); // left
    minesFound += checkTiles(r, c + 1); // right

    // check down
    minesFound += checkTiles(r + 1, c - 1); // left
    minesFound += checkTiles(r + 1, c); //
    minesFound += checkTiles(r + 1, c + 1); // right

    if (minesFound > 0) {
        board[r][c].innerText = minesFound;
        board[r][c].classList.add("x" + minesFound.toString());
    };

};

function checkTiles(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    };
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    };
    return 0;
};