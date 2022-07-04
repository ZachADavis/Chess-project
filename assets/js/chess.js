/* Initializing Variables */
const arrMovedWhitePawnList = [];
const arrMovedBlackPawnList = [];
const arrMovedWhiteBishopList = [];
const arrMovedBlackBishopList = [];
const arrMovedWhiteKnightList = [];
const arrMovedBlackKnightList = [];
const arrMovedBlackCastleList = [];
const arrMovedWhiteCastleList = [];
const blackQueen = null;
const whiteQueen = null;
const blackKing = null;
const whiteKing = null;
const selectedPiece = null;
const previousMovedPiece = null;

/**-------------------Receives click events-------------**/
$(document).on("click", function (event) {
    let x = event.pageX;
    let y = event.pageY;
    let clickedElement = document.elementFromPoint(x, y);
    let id = $(clickedElement).attr('id');

    if (id !== undefined && id.includes("cell")) { //if clicked an empty cell
        if (selectedPiece !== null && selectedPiece.id !== id) { //if one piece selected & then select other cell
            refreshCells(selectedPiece);
        }
        move(selectedPiece, clickedElement); //if previously selected a piece and now select a cell then selected piece move to selected cell

    } else if (id !== undefined && id.includes("p")) { //if clicked a piece
        if (selectedPiece !== null && selectedPiece.id !== id) { //if one piece selected & then select other piece
            refreshCells(selectedPiece);
        }
        calculatePos(id);
        killOppositePiece(selectedPiece, clickedElement);

    }
});

function calculatePos(pieceId) {
    let cellID = $("#" + pieceId).parent('div').attr('id');

    if (previousMovedPiece !== null && pieceId.includes(previousMovedPiece.type)) {
        return;
    }

    if (pieceId.includes("pawn")) {
        if (pieceId.includes("black")) {
            let pawn = createNewBlackPawn(pieceId, cellID);
            calculatePathAhead(pawn);

        } else if (pieceId.includes("white")) {
            let pawn = createNewWhitePawn(pieceId, cellID);
            calculatePathAhead(pawn);
        }

    } else if (pieceId.includes("castle")) {
        if (pieceId.includes("black")) {
            let castle = createNewBlackCastle(pieceId, cellID);
            calculatePathTop(castle);

        } else if (pieceId.includes("white")) {
            let castle = createNewWhiteCastle(pieceId, cellID);
            calculatePathTop(castle);
        }

    } else if (pieceId.includes("knight")) {
        if (pieceId.includes("black")) {
            let knight = createNewBlackKnight(pieceId, cellID);
            calculatePathTopLeft(knight);

        } else if (pieceId.includes("white")) {
            let knight = createNewWhiteKnight(pieceId, cellID);
            calculatePathTopLeft(knight);
        }

    } else if (pieceId.includes("bishop")) {
        if (pieceId.includes("black")) {
            let bishop = createNewBlackBishop(pieceId, cellID);//Factory Methods
            calculatePathTopLeft(bishop);

        } else if (pieceId.includes("white")) {
            let bishop = createNewWhiteBishop(pieceId, cellID);//Factory Methods
            calculatePathTopLeft(bishop);
        }

    } else if (pieceId.includes("queen")) {
        if (pieceId.includes("black")) {
            let queen = createNewBlackQueen(pieceId, cellID);
            calculatePathTop(queen);
            calculatePathTopLeft(queen);

        } else if (pieceId.includes("white")) {
            let queen = createNewWhiteQueen(pieceId, cellID);
            calculatePathTop(queen);
            calculatePathTopLeft(queen);
        }

    } else if (pieceId.includes("king")) {
        if (pieceId.includes("black")) {
            let king = createNewBlackKing(pieceId, cellID);
            calculatePathTop(king);
            calculatePathTopLeft(king);

        } else if (pieceId.includes("white")) {
            let king = createNewWhiteKing(pieceId, cellID);
            calculatePathTop(king);
            calculatePathTopLeft(king);
        }
    }
}

/*
 
 King Factory

 */

function createNewWhiteKing(pieceId, cellID) {
    if (whiteKing === null) {
        whiteKing = new Piece(pieceId, "white", cellID);
    }
    return whiteKing;
}

function createNewBlackKing(pieceId, cellID) {
    if (blackKing === null) {
        blackKing = new Piece(pieceId, "black", cellID);
    }
    return blackKing;
}

/*
 
 Queen Factory

 */

function createNewWhiteQueen(pieceId, cellID) {
    if (whiteQueen === null) {
        whiteQueen = new Piece(pieceId, "white", cellID);
    }
    return whiteQueen;
}

function createNewBlackQueen(pieceId, cellID) {
    if (blackQueen === null) {
        blackQueen = new Piece(pieceId, "black", cellID);
    }
    return blackQueen;
}

/*

 Castle Factory

 */

function createNewWhiteCastle(pieceId, cellID) {
    for (let i = 0; i < arrMovedWhiteCastleList.length; i++) {
        let castle = arrMovedWhiteCastleList[i];

        if (castle.id === pieceId) {
            return castle;
        }
    }

    castle = new Piece(pieceId, "white", cellID);
    arrMovedWhiteCastleList.push(castle);
    return castle;
}

function createNewBlackCastle(pieceId, cellID) {
    for (let i = 0; i < arrMovedBlackCastleList.length; i++) {
        let castle = arrMovedBlackCastleList[i];

        if (castle.id === pieceId) {
            return castle;
        }
    }

    castle = new Piece(pieceId, "black", cellID);
    arrMovedBlackCastleList.push(castle);
    return castle;
}


/*

 Bishop Factory

 */
function createNewBlackBishop(pieceId, cellID) {

    for (let i = 0; i < arrMovedBlackBishopList.length; i++) {
        let bishop = arrMovedBlackBishopList[i];

        if (bishop.id === pieceId) {
            return bishop;
        }
    }

    bishop = new Piece(pieceId, "black", cellID);
    arrMovedBlackBishopList.push(bishop);
    return bishop;
}

function createNewWhiteBishop(pieceId, cellID) {

    for (let i = 0; i < arrMovedWhiteBishopList.length; i++) {
        let bishop = arrMovedWhiteBishopList[i];

        if (bishop.id === pieceId) {
            return bishop;
        }
    }

    bishop = new Piece(pieceId, "white", cellID);
    arrMovedWhiteBishopList.push(bishop);
    return bishop;
}

/*

Pawn Factory

 */

function createNewBlackPawn(pieceId, cellID) {
    for (let i = 0; i < arrMovedBlackPawnList.length; i++) {
        let pawn = arrMovedBlackPawnList[i];
        if (pawn.id === pieceId) {
            return pawn;
        }
    }
    pawn = new Piece(pieceId, "black", cellID);
    arrMovedBlackPawnList.push(pawn);
    return pawn;
}

function createNewWhitePawn(pieceId, cellID) {
    for (let i = 0; i < arrMovedWhitePawnList.length; i++) {
        let pawn = arrMovedWhitePawnList[i];
        if (pawn.id === pieceId) {
            return pawn;
        }
    }
    pawn = new Piece(pieceId, "white", cellID);
    arrMovedWhitePawnList.push(pawn);
    return pawn;
}

/*
 
 Knight Factory

 */

function createNewBlackKnight(pieceId, cellID) {
    for (let i = 0; i < arrMovedBlackKnightList.length; i++) {
        let knight = arrMovedBlackKnightList[i];

        if (knight.id === pieceId) {
            return knight;
        }
    }
    knight = new Piece(pieceId, "black", cellID);
    arrMovedBlackKnightList.push(knight);
    return knight;
}

function createNewWhiteKnight(pieceId, cellID) {
    for (let i = 0; i < arrMovedWhiteKnightList.length; i++) {
        let knight = arrMovedWhiteKnightList[i];
        if (knight.id === pieceId) {
            return knight;
        }
    }
    knight = new Piece(pieceId, "white", cellID);
    arrMovedWhiteKnightList.push(knight);
    return knight;
}

/**-----------------------Piece Object-----------------------**/
function Piece(id, type, currentPosition) {
    this.id = id;
    this.type = type;
    this.currentPosition = currentPosition;

    this.isFirstMove = true;
    this.positionsToBeMoved = [];
    this.obstaclesCanBeKilled = [];
}

//Pawn
function calculatePathAhead(obj) {
    selectedPiece = obj;
    colorPawnKillCell(obj);
    if (obj.type === "white") {
        let offset = $("#" + obj.currentPosition).offset();
        let x = offset.left;
        let y = offset.top - 65;

        let nextCell = document.elementFromPoint(x, y);
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            if (obj.isFirstMove) {
                y -= 65;
                nextCell = document.elementFromPoint(x, y);
                if (!isObstaclesFound(obj, nextCell)) {
                    colorCells(obj, nextCell);
                }
            }
        }

    } else if (obj.type === "black") {
        let offset = $("#" + obj.currentPosition).offset();
        let x = offset.left;
        let y = offset.top + 65;

        let nextCell = document.elementFromPoint(x, y);


        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            if (obj.isFirstMove) {
                y += 65;
                nextCell = document.elementFromPoint(x, y);
                if (!isObstaclesFound(obj, nextCell)) {
                    colorCells(obj, nextCell);
                }
            }
        }
    }
}

//bishop, queen, king and Knight
function calculatePathTopLeft(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left - 65;
    let y = offset.top - 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        let nextCell1 = document.elementFromPoint(x - 65, y);
        let nextCell2 = document.elementFromPoint(x, y - 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }
    calculatePathTopRight(obj);

}

function calculatePathTopRight(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left + 65;
    let y = offset.top - 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        let nextCell1 = document.elementFromPoint(x + 65, y);
        let nextCell2 = document.elementFromPoint(x, y - 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }
    calculatePathBottomLeft(obj);

}

function calculatePathBottomLeft(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left - 65;
    let y = offset.top + 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        let nextCell1 = document.elementFromPoint(x - 65, y);
        let nextCell2 = document.elementFromPoint(x, y + 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }

    calculatePathBottomRight(obj);
}

function calculatePathBottomRight(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left + 65;
    let y = offset.top + 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else if (obj.id.includes("bishop") || obj.id.includes("queen")) {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    } else if (obj.id.includes("knight")) {
        let nextCell1 = document.elementFromPoint(x + 65, y);
        let nextCell2 = document.elementFromPoint(x, y + 65);
        if (!isObstaclesFound(obj, nextCell1)) {
            colorCells(obj, nextCell1);
        }
        if (!isObstaclesFound(obj, nextCell2)) {
            colorCells(obj, nextCell2);
        }
    }

}

//for castle queen and king
function calculatePathTop(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left;
    let y = offset.top - 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left;
            y = offset.top - 65;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathRight(obj);
}

function calculatePathRight(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left + 65;
    let y = offset.top;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left + 65;
            y = offset.top;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathLeft(obj);

}

function calculatePathLeft(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left - 65;
    let y = offset.top;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left - 65;
            y = offset.top;
            nextCell = document.elementFromPoint(x, y);
        }
    }
    calculatePathBottom(obj);
}

function calculatePathBottom(obj) {
    selectedPiece = obj;
    let offset = $("#" + obj.currentPosition).offset();
    let x = offset.left;
    let y = offset.top + 65;

    let nextCell = document.elementFromPoint(x, y);

    if (obj.id.includes("king")) {
        if (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
        }
    } else {
        while (!isObstaclesFound(obj, nextCell)) {
            colorCells(obj, nextCell);
            offset = $(nextCell).offset();
            x = offset.left;
            y = offset.top + 65;
            nextCell = document.elementFromPoint(x, y);
        }
    }
}

/**All pieces**/
function move(obj, cell) {

    for (let i = 0; i < obj.positionsToBeMoved.length; i++) {
        if (obj.positionsToBeMoved[i] === cell) {
            $("#" + obj.id).appendTo(cell);
            refreshCells(obj);
            obj.currentPosition = $(cell).attr('id');
            previousMovedPiece = obj;
            obj.isFirstMove = false;
        }
    }
    isKingChecked(obj.type === "white" ? "black" : "white");
    obj.positionsToBeMoved = [];
}

function killOppositePiece(obj, clickedPiece) {
    //clickedPiece is opposite side piece can be killed
    //obstaclesCanBeKilled has pieces of opposite side that can be killed by bishop
    let cell = $(clickedPiece).parent('div');
    for (let i = 0; i < obj.obstaclesCanBeKilled.length; i++) {
        if ($(clickedPiece).attr('id') === obj.obstaclesCanBeKilled[i].attr('id')) {
            $(clickedPiece).remove();
            $("#" + obj.id).appendTo(cell);
            refreshCells(obj);
            obj.currentPosition = $(cell).attr('id');
            previousMovedPiece = obj;
        }
    }
}

function colorCells(obj, elem) {
    obj.positionsToBeMoved.push(elem);
    $(elem).addClass("color-path");
    $("html").removeClass("color-path");
}

function colorKillCell(cell) {
    $(cell).addClass("color-path");
}

function colorPawnKillCell(obj) {
    let cell1;
    let cell2;
    let offset = $("#" + obj.currentPosition).offset();

    if (obj.type === "white") {
        cell1 = document.elementFromPoint(offset.left - 65, offset.top - 65);
        cell2 = document.elementFromPoint(offset.left + 65, offset.top - 65);
    } else if (obj.type === "black") {
        cell1 = document.elementFromPoint(offset.left - 65, offset.top + 65);
        cell2 = document.elementFromPoint(offset.left + 65, offset.top + 65);
    }

    let kill1 = $(cell1).children('span').attr('id');
    let kill2 = $(cell2).children('span').attr('id');

    if (kill1 !== undefined && !kill1.includes(obj.type)) {
        obj.obstaclesCanBeKilled.push($(cell1).children('span'));
        colorKillCell(cell1);
    }
    if (kill2 !== undefined && !kill2.includes(obj.type)) {
        obj.obstaclesCanBeKilled.push($(cell2).children('span'));
        colorKillCell(cell2);
    }
}

function refreshCells(obj) {
    for (let i = 0; i < obj.positionsToBeMoved.length; i++) {
        $(obj.positionsToBeMoved[i]).removeClass("color-path");
    }

    for (let i = 0; i < obj.obstaclesCanBeKilled.length; i++) {
        $(obj.obstaclesCanBeKilled[i]).parents('div').removeClass("color-path");
    }
}

function isObstaclesFound(obj, nextCell) {
    let child = $(nextCell).children('span');
    if (obj.id.includes("pawn")) { //if the object is a pawn
        if (child.attr('id') === undefined) {
            return false;
        }
        return true;
    }
    //rest of other objects
    if (child.attr('id') === undefined) {
        let id = $(nextCell).attr('id');
        if (id !== undefined && id.includes("cell")) {
            return false;
        }
    } else {
        if (!child.attr('id').includes(obj.type)) {
            obj.obstaclesCanBeKilled.push(child);
            colorKillCell(nextCell);
        }
    }
    return true;
}

/*function isKingChecked(type) {
    let pos;
    if (type === "white") {
        pos = whiteKing.currentPosition;
    } else {
        pos = blackKing.currentPosition;
    }
    let offset = $("#" + pos).offset();
    let x = offset.left;
    let y = offset.top - 65;
    let nextCell = document.elementFromPoint(x, y);
    let id;
    while ((id = inspectNextCell(nextCell)) === undefined) {
        offset = $(nextCell).offset();
        x = offset.left;
        y = offset.top - 65;
        nextCell = document.elementFromPoint(x, y);
    }
    if (!id.includes(type) && id.includes("castle") || id.includes("queen")) {
        alert("King Check");
    }
}
function inspectNextCell(nextCell) {
    return $(nextCell).children('span').attr('id');
}*/