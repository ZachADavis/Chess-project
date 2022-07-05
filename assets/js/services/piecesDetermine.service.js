import pawn from "./determinePiece/pawn.js"
import knight from "./determinePiece/knight.js"
import rook from "./determinePiece/rook.js"
import bishop from "./determinePiece/bishop.js"
import queen from "./determinePiece/queen.js"
import { $, $$, $$$ } from '../utility/utility.js'
import { chessGame } from '../config/chessGame.config.js'
import { playerTurn } from '../services/playerTurn.service.js'
import king from "./determinePiece/king.js"
import knightKingHelpers from "./determinePiece/helpers/kingKnight.helper.js"

export const piecesDetermine = {
    determinationsSelector: 'currentDeterminations',
    
    _determinations: {
        currentDeterminations: {},
        potentialDeterminations: {}
    },

    get determinations() {
        return this._determinations[ this.determinationsSelector ]
    },
    set determinations( value ) {
        this._determinations[ this.determinationsSelector ] = value
    },
    
    ///////////////////////////////

    generateDeterminations( pieceBoxPositionsObject = null ) {
        this.resetDeterminations()
        
        for ( const { 
            pieceSingleType,
            isWhitePiece,
            pieceBoxPosition 
        } of ( 
                pieceBoxPositionsObject ||
                this.getCurrentPieceBoxPositions()
            )
        ) {
            this.determinations[ pieceBoxPosition ] = {}

            this[ pieceDetermineConfig[ pieceSingleType ] ]?.({ 
                isWhitePiece,
                pieceBoxPosition
            })
        }
    },

    getCurrentPieceBoxPositions() {
        const currentPieceboxPositions = []

        for ( const pieceBoxElement of $$( chessGame.chessPieceBoxSelector ) ) {
            const pieceElement = $$$( pieceBoxElement, chessGame.chessPieceSelector )
            if ( !pieceElement ) continue
            
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null
            const isWhitePiece = playerTurn.isWhitePiece( pieceType )
            const pieceSingleType = pieceType.replace( 'white_', '' ).replace( 'black_', '' )

            currentPieceboxPositions.push({
                pieceBoxElement,
                pieceElement,
                pieceBoxPosition,
                pieceType,
                isWhitePiece,
                pieceSingleType
            })
        }
        
        return currentPieceboxPositions
    },

    //////////////////////////

    resetDeterminations() {
        this.determinations = {}
    },
    itereateDetermine( pieceBoxPosition, callbackFn ) {
        const determinationPositions = this.determinations[ pieceBoxPosition ]
        if ( !determinationPositions || !Object.keys( determinationPositions ).length ) return

        for ( const determinationPosition in  determinationPositions) {
            const pieceBoxElement = $( `#${ determinationPosition }` )
            callbackFn( pieceBoxElement )
        }
    },
    hasPiecePotential( pieceBoxPosition, determinationPosition ) {
        return this.determinations[ pieceBoxPosition ]?.[ determinationPosition ] ?? false
    },
    hasPiecePotentials( pieceBoxPosition ) {
        return !( 
            !this.determinations[ pieceBoxPosition ] ||
            !Object.keys( this.determinations[ pieceBoxPosition ] ).length
        )
    },

    ...knightKingHelpers,
    ...pawn,
    ...knight,
    ...rook,
    ...bishop,
    ...queen,
    ...king,
}

const pieceDetermineConfig = {
    'pawn': 'determinePawn',
    'knight': 'determineKnight',
    'rook': 'determineRook',
    'bishop': 'determineBishop',
    'queen': 'determineQueen',
    'king': 'determineKing',
}

window.piecesDetermine = piecesDetermine