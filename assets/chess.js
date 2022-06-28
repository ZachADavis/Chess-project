$(document).ready(function(){


    const selection = {piece:"", player:"", row:"", column:""};
    startTeam = 'White'

    $("[piece]").each(function(){
        let player = $(this).attr('player'),
        piece = $(this).attr('piece')
        boardSquareColor = $(this).css('background-color');
        if (piece == "" || player == ""){
            $(this).attr('empty', 'true');
            $(this).removeattr('player').removeattr('piece');
            return
        }
        $(this).attr("empty", 'false');
        $(this).css("background", "url(assets/pieces/"+ player + "/" + piece + ".png)").css("background-size", "100px 100px").css("background-color", boardSquareColor);
    })
})

$("[empty]").on("click", function() {
    console.log(startTeam)
    let empty = $(this).attr('empty'),
    targetPiece = $(this).attr('piece'),
    targetPlayer = $(this).attr('player'),
    targetRow = $(this).attr('piece'),
    targetColumn = $(this).attr('column')
    if (targetPlayer == startTeam) {
        $("[empty = 'false' ]").each(function() {
            if ($(this).hasClass('square-grey')){
                const backgroundColor = 'grey'
            }
            else {
                const backgroundColor = 'white'
            }
            $(this).css('background-color', backgroundColor)
        })
        $(this).css("background-color", 'pink')
        selection ={piece: targetPiece, player: targetPlayer, row: targetRow, column: targetColumn}
    } else if (selection.piece != '' && selection.player != '' && selection.player == startTeam && 
    (targetRow != selection.row || targetColumn !== selection.column)){
        if (typeof targetPiece == 'undefined'){
            targetPiece = ''
        }
        if (typeof targetPlayer == 'undefined'){
            targetPlayer = ''
        }
        correctMove(selection.player, selection.piece, selection.row, 
            selection.column, targetRow,targetColumn, targetPiece, 
            targetPlayer)
    } else {
        console.log('No selected piece/not correct turn')
    }
})