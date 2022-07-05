import { alphaPositionIn, alphaPositionOut } from '../../config/Positions.config.js'
import { chessGame } from '../../config/chessGame.config.js'
import { $, $$$ } from '../../utils/utils.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determinePawn({ isWhitePiece, pieceBoxPosition }) {
        this.determinePawnWhiteBlack( isWhitePiece, { pieceBoxPosition })
        this.cleanDetermineWhiteBlackPawn( isWhitePiece, { pieceBoxPosition })
    },

    ///////////////////////

    determinePawnWhiteBlack(isWhitePiece = true, { pieceBoxPosition }) {
        const column = +alphaPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]
    
        if ( row === ( isWhitePiece ? 8 : 1 ) ) return

        const determination0 = `${alphaPositionOut[ column ]}${ row + ( isWhitePiece ? 1 : -1 ) }`
        this.determinations[ pieceBoxPosition ][ determination0 ] = true

        if ( row === ( isWhitePiece ? 2 : 7 ) ) {
            const determination1 = `${alphaPositionOut[ column ]}${ isWhitePiece ? 4 : 5 }`
            this.determinations[ pieceBoxPosition ][ determination1 ] = true
        }

        const potentialpos2 = column - 1
        const potentialpos3 = column + 1

        if  (potentialpos2 > 0 && potentialpos2 < 9) {
            const determination2 = `${ alphaPositionOut[ potentialpos2 ] }${ row + ( isWhitePiece ? 1 : -1 ) }`
            this.determinations[ pieceBoxPosition ][ determination2 ] = true
        }
        if  (potentialpos3 > 0 && potentialpos3 < 9) {
            const determination3 = `${ alphaPositionOut[ potentialpos3 ] }${ row + ( isWhitePiece ? 1 : -1 ) }`
            this.determinations[ pieceBoxPosition ][ determination3 ] = true
        }
    },
    cleanDetermineWhiteBlackPawn(isWhitePiece = true, { pieceBoxPosition }) {
        const column = +alphaPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        for ( const determinationPosition in this.determinations[ pieceBoxPosition ] ) {
            const detcolumn = +alphaPositionIn[ determinationPosition[ 0 ] ]
            const detRow = +determinationPosition[ 1 ]

            const determinationPieceBoxElement = $( `#${ determinationPosition }` )
            const determinationPiece = $$$( determinationPieceBoxElement, chessGame.chessPieceSelector )
            
            if ( !determinationPiece ) {
                if ( column !== detcolumn ) {
                    delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
                }
                continue
            }
            
            const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
            const BlackPieceDetermination = playerTurn.isBlackPiece( determinationPieceType )
            const whitePieceDetermination = playerTurn.isWhitePiece( determinationPieceType )
                
            if ( column === detcolumn ) {
                if (detRow === ( isWhitePiece ? 3 : 6 ) ) {
                    const determination0 = `${ determinationPosition[ 0 ] }${ isWhitePiece ? 4 : 5 }`
                    delete this.determinations[ pieceBoxPosition ][ determination0 ]
                }

                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }
            else if ( 
                isWhitePiece && whitePieceDetermination ||
                !isWhitePiece && BlackPieceDetermination
            ) {
                delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            }
        }
    }
}