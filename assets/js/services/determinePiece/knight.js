import { alphaPositionOut } from '../../config/Positions.config.js'

export default {
    determineKnight({ isWhitePiece, pieceBoxPosition }) {
        this.generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations: knightDeterminations })
    },
    
}

const knightDeterminations = [
    (column, row) => `${ alphaPositionOut[ column - 1 ]}${ row - 2 }`, 
    (column, row) => `${ alphaPositionOut[ column - 2 ]}${ row - 1 }`,
    (column, row) => `${ alphaPositionOut[ column + 1 ]}${ row + 2 }`, 
    (column, row) => `${ alphaPositionOut[ column + 2 ]}${ row + 1 }`,

    (column, row) => `${ alphaPositionOut[ column - 1 ]}${ row + 2 }`, 
    (column, row) => `${ alphaPositionOut[ column - 2 ]}${ row + 1 }`,
    (column, row) => `${ alphaPositionOut[ column + 1 ]}${ row - 2 }`, 
    (column, row) => `${ alphaPositionOut[ column + 2 ]}${ row - 1 }`,

]