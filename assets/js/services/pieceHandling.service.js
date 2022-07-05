import pieceEventsMethods from './pieceHandling/PieceEvents.methods.js'
import pieceStatesMethods from './pieceHandling/PieceStates.methods.js'

export const pieceHandling = {
    pieceSelectedPosition: null,

    isPieceSelected() {
        return !!this.pieceSelectedPosition
    },
    changePieceSelected( pieceSelectedPosition ) {
        this.pieceSelectedPosition = pieceSelectedPosition
    },
    resetPieceSelected() {
        this.pieceSelectedPosition = null
    },
    isOnPieceSelected( pieceBoxPosition ) {
        return pieceBoxPosition === this.pieceSelectedPosition 
    },
    isNotOnPieceSelected( pieceBoxPosition ) {
        return !this.isOnPieceSelected( pieceBoxPosition )
    },

    ///////////////////////

    ...pieceEventsMethods,
    ...pieceStatesMethods,
}