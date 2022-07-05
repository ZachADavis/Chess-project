import { alphPositionIn } from '../../../config/Positions.config.js'
import { chessGame } from '../../../config/chessGame.config.js'
import { $, $$$ } from '../../../utility/utility.js'
import { playerTurn } from '../../playerTurn.service.js'

export default {
    generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations }) {
        const column = +alphPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        determinations.
            map( determinationFn => determinationFn( column, row ) ).
            filter( determinationPosition => {
                return this.filterPotentialDeterminations({ isWhitePiece, determinationPosition })  
            }).
            map( determinationPosition => {
                this.determinations[ pieceBoxPosition ][ determinationPosition ] = true
            })
    },
    filterPotentialDeterminations({ isWhitePiece, determinationPosition }) {
        const determinationPieceBox = $( `#${ determinationPosition }` )
        if ( !determinationPieceBox ) return false

        const determinationPiece = $$$( determinationPieceBox, chessGame.chessPieceSelector )
        if ( !determinationPiece ) return true
        
        const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
        const BlackPieceDetermination = playerTurn.isBlackPiece( determinationPieceType )
        const Whitepiecedetermination = playerTurn.isWhitePiece( determinationPieceType )

        if ( 
            isWhitePiece && Whitepiecedetermination ||
            !isWhitePiece && BlackPieceDetermination
        ) { 
            return false
        }

        return true
    }
}