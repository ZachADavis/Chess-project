
import { alphaPositionOut } from '../../config/Positions.config.js'

export default {
    determineKing({ isWhitePiece, pieceBoxPosition }) {
        this.generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations: kingDeterminations })
    },
    
}

const kingDeterminations = [
    (column, row) => `${ alphaPositionOut[ column ]}${ row - 1 }`, 
    (column, row) => `${ alphaPositionOut[ column - 1 ]}${ row - 1 }`,
    (column, row) => `${ alphaPositionOut[ column + 1 ]}${ row - 1 }`,
    
    (column, row) => `${ alphaPositionOut[ column ]}${ row + 1 }`, 
    (column, row) => `${ alphaPositionOut[ column - 1 ]}${ row + 1 }`,
    (column, row) => `${ alphaPositionOut[ column + 1 ]}${ row + 1 }`,

    (column, row) => `${ alphaPositionOut[ column - 1 ]}${ row }`, 
    (column, row) => `${ alphaPositionOut[ column + 1 ]}${ row }`,

]