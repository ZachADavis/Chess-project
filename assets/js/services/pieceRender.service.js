import { piecesImages } from '../config/Images.config.js'
import { initialGame } from '../config/Board.config.js'
import { potentialGame } from '../config/Setup.config.js'
import { chessGame } from '../config/chessGame.config.js'
import { pieceHandling } from '../services/pieceHandling.service.js'
import { piecesDetermine } from '../services/piecesDetermine.service.js'
import { $, $$, $$$ } from '../utils/utils.js'

export const piecesRender = {
    piecesEventListeners: {},

    renderPieces() {
        const gameSetup = chessGame.useInitialGame ? initialGame : potentialGame

        this.placePieceBoxNumbers()
        this.placeWhiteDownOrUp()
        this.placePiecesInPosition( gameSetup )
        this.addPiecesBoxListeners()
        this.piecesDetermine()
    },
    placePieceBoxNumbers() {
        $$( chessGame.chessPieceBoxSelector ).map( pieceBoxElement => {
            const spanElement = document.createElement( 'span' )
            spanElement.classList.add( 'piece-box-text' )
            spanElement.innerHTML = pieceBoxElement.getAttribute( 'id' )
            
            pieceBoxElement.append( spanElement )
        })
    },
    placeWhiteDownOrUp() {
        const flexWrap = chessGame.whitePlaysDown ? 'wrap' : 'wrap-reverse'
        $( chessGame.chessTableSelector ).style.flexWrap = flexWrap
    },
    placePiecesInPosition( gameSetup ) {
        for ( const piecePosition in gameSetup ) {
            const pieceType = gameSetup[ piecePosition ]
            const pieceImageLocation = piecesImages[ pieceType ]

            const imgElement = document.createElement( 'img' )
            imgElement.classList.add( 'piece' )
            imgElement.setAttribute( 'piece-type', pieceType )
            imgElement.src = `${ pieceImageLocation }`

            $( `#${ piecePosition }` ).append( imgElement )
        }
    },
    addPiecesBoxListeners() {
        $$( chessGame.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )
            const pieceElement = $$$( pieceBoxElement, chessGame.chessPieceSelector )
            const pieceType = pieceElement?.getAttribute( 'piece-type' ) ?? null

            const handleParams = {
                pieceBoxElement,
                pieceBoxPosition,
                pieceElement,
                pieceType
            }

            this.piecesEventListeners[ pieceBoxPosition ] = {
                'mouseenter': _ => {
                    pieceHandling.mouseEnter( handleParams )
                },
                'mouseleave': _ => {
                    pieceHandling.mouseLeave( handleParams )
                },
                'click': _ => {
                    pieceHandling.Click( handleParams )
                },
            }

            pieceBoxElement.addEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.addEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.addEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    resetPiecesBoxListeners() {
        $$( chessGame.chessPieceBoxSelector ).forEach( pieceBoxElement => {
            const pieceBoxPosition = pieceBoxElement.getAttribute( 'id' )

            pieceBoxElement.removeEventListener( 'mouseenter', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseenter' ])
            pieceBoxElement.removeEventListener( 'mouseleave', this.piecesEventListeners[ pieceBoxPosition ][ 'mouseleave' ])
            pieceBoxElement.removeEventListener( 'click', this.piecesEventListeners[ pieceBoxPosition ][ 'click' ])
        })
    },
    piecesDetermine() {
        piecesDetermine.generateDeterminations()
    },

    /////////////////////

    getCurrentGameSetup() {
        return $$( chessGame.chessPieceSelector ).
            map( pieceElement => ({
                pieceType: pieceElement.getAttribute( 'piece-type' ),
                piecePosition: pieceElement.closest( chessGame.chessPieceBoxSelector ).getAttribute( 'id' )
            })).
            reduce( (obj, { pieceType, piecePosition } ) => {
                obj[ piecePosition ] = pieceType
                return obj
            }, {})
    }
}

window.piecesRender = piecesRender