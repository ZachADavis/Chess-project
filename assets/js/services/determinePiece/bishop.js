import { alphPositionIn, alphPositionOut } from '../../config/Positions.config.js'
import { chessGame } from '../../config/chessGame.config.js'
import { $, $$$ } from '../../utility/utility.js'
import { playerTurn } from '../playerTurn.service.js'

export default {
    determineBishop({ isWhitePiece, pieceBoxPosition }) {
        this.determineBishopWhiteBlack( isWhitePiece, { pieceBoxPosition })
    },
    determineBishopWhiteBlack( isWhitePiece = true, { pieceBoxPosition }) {
        const column = +alphPositionIn[ pieceBoxPosition[ 0 ] ]
        const row = +pieceBoxPosition[ 1 ]

        const bishopDirectionsConfig = {
            shouldContinue: { 
                position1: true,
                position2: true,
                position3: true,
                position4: true,
            },
            positionDirections: {
                'position1': offset => `${alphPositionOut[ column + offset ]}${ row + offset }`,
                'position2': offset => `${alphPositionOut[ column + offset ]}${ row - offset }`,
                'position3': offset => `${alphPositionOut[ column - offset ]}${ row - offset }`,
                'position4': offset => `${alphPositionOut[ column - offset ]}${ row + offset }`,
            }
        }
        
        for ( let i = 1; i <= 8; i++ ) {
            const determinationPositions = []

            for ( const positionTarget in bishopDirectionsConfig.positionDirections ) {
                if ( !bishopDirectionsConfig.shouldContinue[ positionTarget ] ) continue
                
                const determinationPosition = bishopDirectionsConfig.positionDirections[ positionTarget ]( i )
                const determinationSituation = this.shouldStopPosition({ isWhitePiece, determinationPosition })
                
                if ( determinationSituation === 0 ) {
                    determinationPositions.unshift( determinationPosition )
                }
                else if ( determinationSituation === 1 ) {
                    bishopDirectionsConfig.shouldContinue[ positionTarget ] = false
                }
                else if ( determinationSituation === 2 ) {
                    bishopDirectionsConfig.shouldContinue[ positionTarget ] = false
                    determinationPositions.unshift( determinationPosition )
                }
            }
            
            determinationPositions.forEach( determinationPosition => {
                if ( determinationPosition !== pieceBoxPosition ) {
                    this.determinations[ pieceBoxPosition ][ determinationPosition ] = true
                }
            })
        }
    },
    shouldStopPosition({ isWhitePiece, determinationPosition }) {
        if ( !$( `#${ determinationPosition }` ) ) return 1

        const determinationPieceBoxElement = $( `#${ determinationPosition }` )
        const determinationPiece = $$$(determinationPieceBoxElement, chessGame.chessPieceSelector )
        
        if ( !determinationPiece ) return 0

        const determinationPieceType = determinationPiece.getAttribute( 'piece-type')
        const BlackPieceDetermination = playerTurn.isBlackPiece( determinationPieceType )
        const WhitePieceDetermination = playerTurn.isWhitePiece( determinationPieceType )

        if ( 
            isWhitePiece && BlackPieceDetermination ||
            !isWhitePiece && WhitePieceDetermination
        ) { 
            return 2
        }

        return 1
    },
}