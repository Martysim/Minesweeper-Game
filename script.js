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

function clickTile(event) {

    if (gameOver || this.classList.contains("tile-clicked")) {
        return;
    };

    let tile = event.target;

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
        setTimeout(() => {
            alert("GAME OVER");
        }, 1000)
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

    const row = {
        up: r - 1,
        down: r + 1,
        center: r
    };

    const column = {
        left: c - 1,
        right: c + 1,
        center: c
    };

    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return;
    };
    if (board[r][c].classList.contains("tile-clicked")) {
        return;
    };
    board[r][c].classList.add("tile-clicked")
    tilesClicked += 1;

    let minesReplace = 0;
    //minesaround

    minesReplace += checkTiles(row.up, column.left);
    minesReplace += checkTiles(row.up, column.center);
    minesReplace += checkTiles(row.up, column.right);

    minesReplace += checkTiles(row.center, column.left);
    minesReplace += checkTiles(row.center, column.right);

    minesReplace += checkTiles(row.down, column.left);
    minesReplace += checkTiles(row.down, column.center);
    minesReplace += checkTiles(row.down, column.right);

    if (minesReplace > 0) {
        board[r][c].innerText = minesReplace;
        board[r][c].classList.add("x" + minesReplace.toString());
    } else {
        board[r][c].classList.add("darkgray");
        // board[r][c].append(document.createElement("span").innerText = 0);
        board[r][c].innerText = 0;

        checkMine(row.up, column.left);
        checkMine(row.up, column.center);
        checkMine(row.up, column.right);

        checkMine(row.center, column.left);
        checkMine(row.center, column.right);

        checkMine(row.down, column.left);
        checkMine(row.down, column.center);
        checkMine(row.down, column.right);
    };
    if (tilesClicked == rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
        setTimeout(() => {
            alert("YOU WIN");
        }, 1000)
        return;
    };
};

function checkTiles(r, c) {
    // console.log(r, c);
    if (r < 0 || r >= rows || c < 0 || c >= columns) {
        return 0;
    };
    if (minesLocation.includes(r.toString() + "-" + c.toString())) {
        return 1;
    };
    return 0;
};
