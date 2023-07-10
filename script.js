let board = [];
let rows = 8;
let colums = 8;
const icons = {
    flag: "🚩"
}

let minsCount = 5;
let minsLocate = [];

let tilesClicked = 0;
let flagEnabaled = false;

let gameOver = false;

window.onload = function () {
    startGame();
};

function startGame() {
    document.getElementById("mines-count").innerText = minsCount;
    document.getElementById('flag-button').addEventListener("click", setFlag);

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < colums; c++) {

            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.addEventListener("click", clickTile);
            document.getElementById("board").append(tile);
            row.push(tile);
        };
        board.push(row);
    };
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
    };

};