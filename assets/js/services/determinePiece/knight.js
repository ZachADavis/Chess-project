import { alphPositionOut } from '../../config/Positions.config.js'

export default {
    determineKnight({ isWhitePiece, pieceBoxPosition }) {
        this.generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations: knightDeterminations })
    },
    
}

const knightDeterminations = [
    (column, row) => `${ alphPositionOut[ column - 1 ]}${ row - 2 }`, 
    (column, row) => `${ alphPositionOut[ column - 2 ]}${ row - 1 }`,
    (column, row) => `${ alphPositionOut[ column + 1 ]}${ row + 2 }`, 
    (column, row) => `${ alphPositionOut[ column + 2 ]}${ row + 1 }`,

    (column, row) => `${ alphPositionOut[ column - 1 ]}${ row + 2 }`, 
    (column, row) => `${ alphPositionOut[ column - 2 ]}${ row + 1 }`,
    (column, row) => `${ alphPositionOut[ column + 1 ]}${ row - 2 }`, 
    (column, row) => `${ alphPositionOut[ column + 2 ]}${ row - 1 }`,

]