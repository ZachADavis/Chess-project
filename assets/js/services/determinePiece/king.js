
import { alphPositionOut } from '../../config/Positions.config.js'

export default {
    determineKing({ isWhitePiece, pieceBoxPosition }) {
        this.generatePotentialDeterminations({ isWhitePiece, pieceBoxPosition, determinations: kingDeterminations })
    },
    
}

const kingDeterminations = [
    (column, row) => `${ alphPositionOut[ column ]}${ row - 1 }`, 
    (column, row) => `${ alphPositionOut[ column - 1 ]}${ row - 1 }`,
    (column, row) => `${ alphPositionOut[ column + 1 ]}${ row - 1 }`,
    
    (column, row) => `${ alphPositionOut[ column ]}${ row + 1 }`, 
    (column, row) => `${ alphPositionOut[ column - 1 ]}${ row + 1 }`,
    (column, row) => `${ alphPositionOut[ column + 1 ]}${ row + 1 }`,

    (column, row) => `${ alphPositionOut[ column - 1 ]}${ row }`, 
    (column, row) => `${ alphPositionOut[ column + 1 ]}${ row }`,

]