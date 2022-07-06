import { alphaPositionIn, alphaPositionOut } from '../../config/Positions.config.js'
import { chessGame } from '../../config/chessGame.config.js'
import { $, $$$ } from '../../utility/utility.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determineRook({ isWhitePiece, pieceBoxPosition }) {
        this.determineRookWhiteBlack( isWhitePiece, { pieceBoxPosition })
        this.cleanDetermineWhiteBlackRook( isWhitePiece, { pieceBoxPosition })
    },
    determineRookWhiteBlack( isWhitePiece = true, { pieceBoxPosition }) {
        const column = +alphaPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        for ( let i = 1; i <= 8; i++ ) {
            const determination0 = `${alphaPositionOut[ i ]}${ row }`
            const determination1 = `${alphaPositionOut[ column ]}${ i }`
            
            if ( determination0 !== pieceBoxPosition ) {
                this.determinations[ pieceBoxPosition ][ determination0 ] = true
            }

            if ( determination1 !== pieceBoxPosition ) {
                this.determinations[ pieceBoxPosition ][ determination1 ] = true
            }
        }
    },

    ////////////////////////////////////

    cleanDetermineWhiteBlackRook( isWhitePiece = true, { pieceBoxPosition }) {
        const column = +alphaPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        let shouldDeleteDeterminations = { value: false }
        for ( let detRow = row + 1; detRow <= 8; detRow++ ) {
            const determinationPosition = `${alphaPositionOut[ column ]}${ detRow }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detRow = row - 1; detRow >= 1; detRow-- ) {
            const determinationPosition = `${alphaPositionOut[ column ]}${ detRow }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detcolumn = column + 1; detcolumn <= 8; detcolumn++ ) {
            const determinationPosition = `${alphaPositionOut[ detcolumn ]}${ row }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }

        shouldDeleteDeterminations = { value: false }
        for ( let detcolumn = column - 1; detcolumn >= 1; detcolumn-- ) {
            const determinationPosition = `${alphaPositionOut[ detcolumn ]}${ row }`
            this.cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) 
        }
        
    },
    cleanIncomingPiecesRook({ isWhitePiece, shouldDeleteDeterminations, pieceBoxPosition, determinationPosition }) {
        if ( shouldDeleteDeterminations.value ) {
            delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
            return
        }

        const determinationPieceBoxElement = $( `#${ determinationPosition }` ) 
        const determinationPiece = $$$( determinationPieceBoxElement, chessGame.chessPieceSelector )
        
        if ( !determinationPiece ) return

        const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
        const blackPieceDetermination = playerTurn.isBlackPiece( determinationPieceType )
        const whitePieceDetermination = playerTurn.isWhitePiece( determinationPieceType )
        
        shouldDeleteDeterminations.value = true

        if ( 
            isWhitePiece && blackPieceDetermination ||
            !isWhitePiece && whitePieceDetermination
        ) { 
            return
        }

        delete this.determinations[ pieceBoxPosition ][ determinationPosition ]
    }
}