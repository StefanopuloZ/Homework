/////////////// global variables ///////////////

let selectedPiece = "",
    plannedMove = "",
    playerColor = "white",
    validMoves = [],
    checkingFigures = [];



/////////////// main code ///////////////

drawBoard();
document.getElementById("table-area").addEventListener("click", moveFlow);


/////////////// methods ///////////////

function moveFlow(event) {
    let cell = (event.target.tagName !== "TD") ? event.target.parentNode : event.target;
    let id = cell.id.slice(5);
    if (table[id].color !== playerColor && selectedPiece === "" && Object.keys(table[id]).length > 0) {
        console.log("Invalid piece selected");
        return
    }
    if (selectedPiece === "") {
        if (!table[id].color) {
            console.log("Empty cell");
            return false;
        }
        selectedPiece = id;
    } else {
        plannedMove = id;
        if (validMove(selectedPiece, plannedMove)) {
            table[plannedMove] = table[selectedPiece]
            table[selectedPiece] = {};
            selectedPiece = "";
            playerColor = (playerColor === "white") ? "black" : "white";
            validMoves = [];
            if (check(plannedMove)) {
                console.log("Check!");
            }
        } else {
            console.log("Invalid move.");
            selectedPiece = "";
        }
    }
    drawBoard();
    if (selectedPiece !== "") {
        document.getElementById("cell-" + id).classList.add("active");
        showValidMoves(id, false);
    }
};

function showValidMoves(id, checkForCheck) {
    if (table[id].piece === "rook") rookRules(id, checkForCheck)
    else if (table[id].piece === "king") kingRules(id, checkForCheck)
    else if (table[id].piece === "queen") queenRules(id, checkForCheck)
    else if (table[id].piece === "bishop") bishopRules(id, checkForCheck)
    else if (table[id].piece === "knight") knightRules(id, checkForCheck)
    else if (table[id].piece === "pawn") pawnRules(id, checkForCheck)
}

function validMove(start, end) {
    console.log(start, end, table[start], table[end]);
    if (validMoves.indexOf(parseInt(end)) === -1) {
        return false
    }
    return true;
}

function check(id) {
    showValidMoves(id, true);
    if (checkingFigures.length !== 0) {
        return true
    } else {
        return false
    }
}

/////////////// figure rules ///////////////

//rook

function rookRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    for (let i = 1; i < x + 1; i++) {
        if (table[id - i].color === color) break
        drawMovesAndValidate(id - i, id, checkForCheck);
        if (table[id - i].color === opponentColor) break
    }
    for (let i = 1; i < 8 - x; i++) {
        if (table[id + i].color === color) break
        drawMovesAndValidate(id + i, id, checkForCheck);
        if (table[id + i].color === opponentColor) break
    }
    for (let i = 1; i < y + 1; i++) {
        if (table[id - i * 8].color === color) break
        drawMovesAndValidate(id - i * 8, id, checkForCheck);
        if (table[id - i * 8].color === opponentColor) break
    }
    for (let i = 1; i < 8 - y; i++) {
        if (table[id + i * 8].color === color) break
        drawMovesAndValidate(id + i * 8, id, checkForCheck);
        if (table[id + i * 8].color === opponentColor) break
    }
}

//king

function kingRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    for (let i = 1; i < x + 1; i++) {
        if (table[id - i].color === color) break
        drawMovesAndValidate(id - i, id, checkForCheck);
        if (table[id - i].color === opponentColor) break
        break
    }
    for (let i = 1; i < 8 - x; i++) {
        if (table[id + i].color === color) break
        drawMovesAndValidate(id + i, id, checkForCheck);
        if (table[id + i].color === opponentColor) break
        break
    }
    for (let i = 1; i < y + 1; i++) {
        if (table[id - i * 8].color === color) break
        drawMovesAndValidate(id - i * 8, id, checkForCheck);
        if (table[id - i * 8].color === opponentColor) break
        break
    }
    for (let i = 1; i < 8 - y; i++) {
        if (table[id + i * 8].color === color) break
        drawMovesAndValidate(id + i * 8, id, checkForCheck);
        if (table[id + i * 8].color === opponentColor) break
        break
    }
    //diagonal
    for (let i = 1; i < x + 1; i++) {
        if (table[id - i * 7] === undefined) break
        if (table[id - i * 7].color === color) break
        drawMovesAndValidate(id - i * 7, id, checkForCheck);
        if (table[id - i * 7].color === opponentColor) break
        break
    }
    for (let i = 1; i < 8 - x; i++) {
        if (table[id + i * 7] === undefined) break
        if (table[id + i * 7].color === color) break
        drawMovesAndValidate(id + i * 7, id, checkForCheck);
        if (table[id + i * 7].color === opponentColor) break
        break
    }
    for (let i = 1; i < y + 1; i++) {
        if (table[id - i * 9] === undefined) break
        if (table[id - i * 9].color === color) break
        drawMovesAndValidate(id - i * 9, id, checkForCheck);
        if (table[id - i * 9].color === opponentColor) break
        break
    }
    for (let i = 1; i < 8 - y; i++) {
        if (table[id + i * 9] === undefined) break
        if (table[id + i * 9].color === color) break
        drawMovesAndValidate(id + i * 9, id, checkForCheck);
        if (table[id + i * 9].color === opponentColor) break
        break
    }
}

//queen

function queenRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    for (let i = 1; i < x + 1; i++) {
        if (table[id - i].color === color) break
        drawMovesAndValidate(id - i, id, checkForCheck);
        if (table[id - i].color === opponentColor) break
    }
    for (let i = 1; i < 8 - x; i++) {
        if (table[id + i].color === color) break
        drawMovesAndValidate(id + i, id, checkForCheck);
        if (table[id + i].color === opponentColor) break
    }
    for (let i = 1; i < y + 1; i++) {
        if (table[id - i * 8].color === color) break
        drawMovesAndValidate(id - i * 8, id, checkForCheck);
        if (table[id - i * 8].color === opponentColor) break
    }
    for (let i = 1; i < 8 - y; i++) {
        if (table[id + i * 8].color === color) break
        drawMovesAndValidate(id + i * 8, id, checkForCheck);
        if (table[id + i * 8].color === opponentColor) break
    }
    //diagnal
    for (let i = 1; i < 9; i++) {
        if (table[id - i * 7] === undefined) break
        if (table[id - i * 7].color === color) break
        if (!validDiagnoal(id, id - i * 7)) break
        drawMovesAndValidate(id - i * 7, id, checkForCheck);
        if (table[id - i * 7].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id + i * 7] === undefined) break
        if (table[id + i * 7].color === color) break
        if (!validDiagnoal(id, id + i * 7)) break
        drawMovesAndValidate(id + i * 7, id, checkForCheck);
        if (table[id + i * 7].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id - i * 9] === undefined) break
        if (table[id - i * 9].color === color) break
        if (!validDiagnoal(id, id - i * 9)) break
        drawMovesAndValidate(id - i * 9, id, checkForCheck);
        if (table[id - i * 9].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id + i * 9] === undefined) break
        if (table[id + i * 9].color === color) break
        console.log(id, table[id + i * 9]);
        if (!validDiagnoal(id, id + i * 9)) break
        drawMovesAndValidate(id + i * 9, id, checkForCheck);
        if (table[id + i * 9].color === opponentColor) break
    }
}

//bishop

function bishopRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    //diagnal
    for (let i = 1; i < 9; i++) {
        if (table[id - i * 7] === undefined) break
        if (table[id - i * 7].color === color) break
        if (!validDiagnoal(id, id - i * 7)) break
        drawMovesAndValidate(id - i * 7, id, checkForCheck);
        if (table[id - i * 7].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id + i * 7] === undefined) break
        if (table[id + i * 7].color === color) break
        if (!validDiagnoal(id, id + i * 7)) break
        drawMovesAndValidate(id + i * 7, id, checkForCheck);
        if (table[id + i * 7].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id - i * 9] === undefined) break
        if (table[id - i * 9].color === color) break
        if (!validDiagnoal(id, id - i * 9)) break
        drawMovesAndValidate(id - i * 9, id, checkForCheck);
        if (table[id - i * 9].color === opponentColor) break
    }
    for (let i = 1; i < 9; i++) {
        if (table[id + i * 9] === undefined) break
        if (table[id + i * 9].color === color) break
        if (!validDiagnoal(id, id + i * 9)) break
        drawMovesAndValidate(id + i * 9, id, checkForCheck);
        if (table[id + i * 9].color === opponentColor) break
    }
}

//knight

function knightRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    //above x-axis
    for (let i = 1; i < 2; i++) {
        if (table[id + 6] === undefined) break
        if (table[id + 6].color === color) break
        if (!validJump(id, id + 6)) break
        drawMovesAndValidate(id + 6, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id + 15] === undefined) break
        if (table[id + 15].color === color) break
        if (!validJump(id, id + 15)) break
        drawMovesAndValidate(id + 15, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id + 10] === undefined) break
        if (table[id + 10].color === color) break
        if (!validJump(id, id + 10)) break
        drawMovesAndValidate(id + 10, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id + 17] === undefined) break
        if (table[id + 17].color === color) break
        if (!validJump(id, id + 17)) break
        drawMovesAndValidate(id + 17, id, checkForCheck);
    }
    //below x-axis
    for (let i = 1; i < 2; i++) {
        if (table[id - 6] === undefined) break
        if (table[id - 6].color === color) break
        if (!validJump(id, id - 6)) break
        drawMovesAndValidate(id - 6, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id - 10] === undefined) break
        if (table[id - 10].color === color) break
        if (!validJump(id, id - 10)) break
        drawMovesAndValidate(id - 10, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id - 15] === undefined) break
        if (table[id - 15].color === color) break
        if (!validJump(id, id - 15)) break
        drawMovesAndValidate(id - 15, id, checkForCheck);
    }
    for (let i = 1; i < 2; i++) {
        if (table[id - 17] === undefined) break
        if (table[id - 17].color === color) break
        if (!validJump(id, id - 17)) break
        drawMovesAndValidate(id - 17, id, checkForCheck);
    }
}

//pawn

function pawnRules(id, checkForCheck) {
    id = parseInt(id);
    let color = table[id].color;
    let opponentColor = (color === "white") ? "black" : "white"
    let x = convertCell(id)[0];
    let y = convertCell(id)[1];
    if (color === "white") {
        for (let i = 1; i < 3; i++) {
            if (table[id - i * 8] === undefined) break
            if (table[id - i * 8].color === color || table[id - i * 8].color === opponentColor) break
            drawMovesAndValidate(id - i * 8, id, checkForCheck);
            if (!firstMove(id, color)) break
        }
        // eating
        for (let i = 1; i < 2; i++) {
            if (table[id - 7] === undefined) break
            if (table[id - 7].color !== opponentColor) break
            if (!validDiagnoal(id, id - i * 7)) break
            drawMovesAndValidate(id - i * 7, id, checkForCheck);
        }
        for (let i = 1; i < 2; i++) {
            if (table[id - 9] === undefined) break
            if (table[id - 9].color !== opponentColor) break
            if (!validDiagnoal(id, id - i * 9)) break
            drawMovesAndValidate(id - i * 9, id, checkForCheck);
        }
    } else {
        for (let i = 1; i < 3; i++) {
            if (table[id + i * 8] === undefined) break
            if (table[id + i * 8].color === color || table[id + i * 8].color === opponentColor) break
            drawMovesAndValidate(id + i * 8, id, checkForCheck);
            if (!firstMove(id, color)) break
        }
        // eating
        for (let i = 1; i < 2; i++) {
            if (table[id + 7] === undefined) break
            if (table[id + 7].color !== opponentColor) break
            if (!validDiagnoal(id, id + i * 7)) break
            drawMovesAndValidate(id + i * 7, id, checkForCheck);
        }

        for (let i = 1; i < 2; i++) {
            if (table[id + 9] === undefined) break
            if (table[id + 9].color !== opponentColor) break
            if (!validDiagnoal(id, id + i * 9)) break
            drawMovesAndValidate(id + i * 9, id, checkForCheck);
        }
    }


}




// other functions

function drawMovesAndValidate(id, pieceId, checkForCheck) {
    if (!checkForCheck) {
        document.getElementById(`cell-${id}`).classList.add("avilable-moves");
        validMoves.push(id);
    } else {
        if (table[id].piece === "king") {
            checkingFigures.push({
                id: pieceId,
                color: table[pieceId].color,
                piece: table[pieceId].piece
            })
        }
    }
}

function convertCell(id) {
    return [id % 8, Math.floor(id / 8)]
}

function firstMove(id, color) {
    let a = convertCell(id);
    if (color === "white") {
        return (a[1] === 6) ? true : false
    } else {
        return (a[1] === 1) ? true : false
    }
}

function validDiagnoal(start, end) {
    let a = convertCell(start);
    let b = convertCell(end);
    return Math.abs(a[0] - b[0]) === Math.abs(a[1] - b[1])
}

function validJump(start, end) {
    let a = convertCell(start);
    let b = convertCell(end);
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 3
}

function drawBoard() {
    let html = '<table id="chessTable">';
    for (let i = 0; i < table.length; i++) {
        if (i % 8 == 0) {
            html += "<tr>";
        }
        if (Object.keys(table[i]).length > 0) {
            let color = table[i].color;
            let piece = table[i].piece;
            html += `<td id="cell-${i}">${pieces[piece][color]} <span class="cell-number">${i}</span>
            <span class="cell-cooridantes">${convertCell(i)}</span></td>`;
        } else {
            html += `<td id="cell-${i}"><span class="cell-number">${i}</span>
            <span class="cell-cooridantes">${convertCell(i)}</span></td>`;
        }
        if (i % 8 == 7) {
            html += "</tr>";
        }
    }
    html += '</table>';
    document.getElementById("table-area").innerHTML = html;
}

// helper functions