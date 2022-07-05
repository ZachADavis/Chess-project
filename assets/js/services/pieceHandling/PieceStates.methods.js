const classesSelectors = {
    'pieceSelected': 'piece-selected',
    'pieceNotAllowed': 'piece-not-allowed',
    'pieceReady': 'piece-ready',
    'piecePotential': 'piece-potential',
    'piecePointer': 'piece-pointer',
};

const methodsSelectors = [
    { 'set': 'add' },
    { 'remove': 'remove' }
]

export default (_ => {
    const pieceStatesMethods = {}
    
    for ( const classkey in classesSelectors ) {
        const methodName = classkey.replace( 'piece', '' )
        
        methodsSelectors.map( value => {
            const methodSelector = `${ Object.keys( value )[ 0 ] }${ methodName }`
            const classMethodSelector = `${ Object.values( value )[ 0 ] }`

            pieceStatesMethods[ methodSelector ] = pieceBoxElement => {
                pieceBoxElement.classList[ classMethodSelector ]( classesSelectors[ classkey ] )
            }
        })
    }

    return pieceStatesMethods
})()