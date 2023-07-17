const board = [];
let rows = 8;
let columns = 8;
const icons = {
    flag: "🚩",
    Mine: "💣"
};

let minesCount = 5;
const minesLocation = [];

let tilesClicked = 0;
let flagEnabaled = false;

let gameOver = false;

window.onload = function () {
    startGame();
};

function setMines() {
    let minesLeft = minesCount;

    while (minesLeft > 0) {
        const r = Math.floor(Math.random() * rows);
        const c = Math.floor(Math.random() * columns);
        const id = r.toString() + "-" + c.toString();

        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        };
    };
};

function startGame() {
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById('flag-button').addEventListener('click', setFlag);
    setMines();

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //<div id="0-0"></div>
            const tile = document.createElement("div");
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
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    } else {
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    };
    flagEnabaled = !flagEnabaled;
};

function clickTile() {

    let tile = this;
    console.log(tile);
    if (flagEnabaled) {
        if (tile.innerText == "") {
            tile.innerText = icons.flag;
        } else if (tile.innerText == icons.flag) {
            tile.innerText = "";
        };
        return;
    };

    if (minesLocation.includes(tile.id)) {
        alert("GAME OVER");
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
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    };
    board[r][c].classList.add("tile-clicked")

    let minesReplace = 0;
    //minesaround
    // check up
    minesReplace += checkTiles(r - 1, c - 1); // left
    minesReplace += checkTiles(r - 1, c); //
    minesReplace += checkTiles(r - 1, c + 1); // right
    // DINAMIK
    minesReplace += checkTiles(r, c - 1); // left
    minesReplace += checkTiles(r, c + 1); // right

    // check down
    minesReplace += checkTiles(r + 1, c - 1); // left
    minesReplace += checkTiles(r + 1, c); //
    minesReplace += checkTiles(r + 1, c + 1); // right

    if (minesReplace > 0) {
        board[r][c].innerText = minesReplace;
        board[r][c].classList.add("x" + minesReplace.toString());
    } else {
        board[r][c].classList.add("darkgray");
        board[r][c].innerText = 0;

        checkMine(r - 1, c - 1); // left
        checkMine(r - 1, c); //up
        checkMine(r - 1, c + 1); // right

        checkMine(r, c - 1); // left
        checkMine(r, c + 1); // right

        checkMine(r + 1, c - 1); // left
        checkMine(r + 1, c); //down
        checkMine(r + 1, c + 1); // right
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
