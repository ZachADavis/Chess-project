import { chessGame } from '../../../config/chessGame.config.js'
import { $, $$$ } from '../../../utility/utility.js'
import { piecesRender } from '../../pieceRender.service.js'
import { playerTurn } from '../../../services/playerTurn.service.js'
import { piecesDetermine } from '../../piecesDetermine.service.js'

export default {
    handleMovingThePiece({ pieceBoxElement, pieceElement }) {
        if ( pieceElement ) {
            pieceElement.remove()
        }

        const pieceBoxElementSelected = $( `#${ this.pieceSelectedPosition }` )
        const pieceElementSelected = $$$( pieceBoxElementSelected, chessGame.chessPieceSelector )
        pieceBoxElement.append( pieceElementSelected )

        this.removeReady( pieceBoxElementSelected )
        this.removeSelected( pieceBoxElementSelected )
        this.removePiecePotentials( this.pieceSelectedPosition )
        this.removeReady( pieceBoxElementSelected )
        this.resetPieceSelected()
        
        playerTurn.changeTurn()
        piecesDetermine.generateDeterminations()
        piecesRender.resetPiecesBoxListeners()
        piecesRender.addPiecesBoxListeners()
    }
}