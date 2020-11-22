const { blackPieces, whitePieces } = require("../enums/pieces");
const { letterToName } = require('../enums/letterToName');
const { valuePieces } = require("../enums/valuePieces");
const { moveWhite } = require("./White");
const { move } = require("../responses/my_turn");
const movePiece = require("../extras/movePiece").movePiece;
const weightPieces = require("../enums/weightPieces").weightPieces;

//arreglo donde guardo todos los posibles movimientos a hacer esta jugada
let possibleMovementsBlack = [];
let iterLevel;

function moveBlack(matriz, iterDeep) {

    iterLevel = iterDeep;

    //vacio el arreglo porque tiene movimientos de la jugada anterior
    possibleMovementsBlack = [ ];

    //si lo llamaron desde el socket, seteo la profundidad de minimax
    //si no lo llamo el socket, es porque estoy en un bucle y respeto el iterLevel que me mandaron
    // if (moveBlack.caller == move){
    //     iterLevel = 2
    // }
    //si iterLevel es 0 y no viene del ws, es porque el bucle tiene que terminar 
    if(iterLevel == 0){
        return {value: 0}
    }
    
    //itero sobre toda la matriz buscando mis piezas
    for(let col = 0; col < 16; col++){
        for(let row = 0; row < 16; row++){
            // console.log(matriz, row, col, iterLevel)

            switch (matriz[row][col]){

                case blackPieces[0]://Pawn
                    pawnMoves(matriz, row, col);
                    break;

                case blackPieces[1]://Rook
                    rookMoves(matriz, row, col);
                    break;

                case blackPieces[2]://Bishop
                    bishopMoves(matriz, row, col);
                    break;

                case blackPieces[3]://Horse
                    horseMoves(matriz, row, col)
                    break;

                case blackPieces[4]://Queen
                    queenMoves(matriz, row, col);
                    break;

                case blackPieces[5]://King
                    kingMoves(matriz, row, col);
                    break;

                default:
                    break;
            }
        }
    }

    // busco cual de los resultados es el que tiene el mayor valor.
    let max = 0; 

    possibleMovementsBlack.forEach(pm => {
        if (pm.value >= max){
            max = pm.value
        }
    })

    // guardo el indice de ese maximo
    let index = 0;
    index = possibleMovementsBlack.findIndex( s => s.value == max);

    // console.log(possibleMovementsBlack)
    // console.log(matriz)

    let result = {
        value: possibleMovementsBlack[index].value,
        from_row: possibleMovementsBlack[index].from_row,
        from_col: possibleMovementsBlack[index].from_col,
        to_row: possibleMovementsBlack[index].to_row,
        to_col: possibleMovementsBlack[index].to_col,
    }
    
    // devuelvo un json con los datos desde y hacia del movimiento de mayor valor
    return result;
}

function horseMoves(matriz, row, col){

    if (row < 14 && col < 15){
        //come en ese lugar
        if (whitePieces.includes(matriz[row+2][col+1])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row+2][col+1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+2,
                    to_col: col+1
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row+2][col+1] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+2,
                    to_col: col+1
                }
            )
        }
    }

    if (row < 15 && col < 14){
        //come en ese lugar
        if (whitePieces.includes(matriz[row+1][col+2])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row+1][col+2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+1,
                    to_col: col+2
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row+1][col+2] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+1,
                    to_col: col+2
                }
            )
        }
    }

    if (row > 1 && col < 15){
        //come en ese lugar
        if (whitePieces.includes(matriz[row-2][col+1])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-2][col+1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-2,
                    to_col: col+1
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row-2][col+1] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-2,
                    to_col: col+1
                }
            )
        }
    }

    if (row > 0 && col < 14){
        //come en ese lugar
        if (whitePieces.includes(matriz[row-1][col+2])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-1][col+2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-1,
                    to_col: col+2
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row-1][col+2] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-1,
                    to_col: col+2
                }
            )
        }
    }

    if (row > 0 && col > 1){
        //come en ese lugar
        if (whitePieces.includes(matriz[row-1][col-2])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-1][col-2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-1,
                    to_col: col-2
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row-1][col-2] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-1,
                    to_col: col-2
                }
            )
        }
    }

    if (row > 1 && col > 0){
        //come en ese lugar
        if (whitePieces.includes(matriz[row-2][col-1])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-2][col-1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-2,
                    to_col: col-1
                }
            )
        }

        //se mueve a ese lugar
        else if(matriz[row-2][col-1] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row-2,
                    to_col: col-1
                }
            )
        }
    }

    if(row < 15 && col > 1){
        if (whitePieces.includes(matriz[row+1][col-2])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row+1][col-2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col-2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+1,
                    to_col: col-2
                }
            )
        }
    
        //se mueve a ese lugar
        else if(matriz[row+1][col-2] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+1, col-2), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+1,
                    to_col: col-2
                }
            )
        }
    }

    if(row < 14 && col > 0){
        if (whitePieces.includes(matriz[row+2][col-1])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row+2][col-1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+2,
                    to_col: col-1
                }
            )
        }
    
        //se mueve a ese lugar
        else if(matriz[row+2][col-1] == ' '){
            possibleMovementsBlack.push(
                {
                    value: valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row+2,
                    to_col: col-1
                }
            )
        }
    }
}

function kingMoves(matriz, row, col){

    for(let i = row - 1; 0 < i && i <= row + 1 && i < 16; i++){
        for(let j = col - 1; 0 < j && j <= col + 1 && j < 16; j++){

            //que no analice la misma posicion adonde esta
            if(j == col && i == row){
                continue;
            }

            //si hay una negra adelante, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
            }

            //si no hay nada adelante, se mueve ahi
            else if(matriz[i][j] == ' '){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.King - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
            }
        }
    }
}

function rookMoves(matriz, row, col){

    //* busca la primera pieza que encuentra adelante
    for (let i = row + 1 ; i < 16; i++){

        // si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][col])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, col), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )

            break;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][col])){
            if( i - row > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook - moveWhite( movePiece(matriz, row, col, i-1, col), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: (i-1),
                        to_col: col
                    }
                )

            } 

            break;
        }
    } 

    //* busca la primera pieza que encuentra atras
    for (let i = row-1; i > 0; i--){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][col])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, col), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio adelante, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][col])){
            if ((row - i > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook - rookMoves.caller.caller == move? moveWhite(null, movePiece(matriz, row, col, i+1, col)).value: 0,
                        from_row: row,
                        from_col: col,
                        to_row: (i+1),
                        to_col: col
                    }
                )    
            }
            break;

        }
    } 

    //* busca la primera pieza a la derecha
    for (let j = col-1; j > 0; j--){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[row][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - rookMoves.caller.caller == move? moveWhite(null, movePiece(matriz, row, col, row, j)).value: 0,
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio a la derecha, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[row][j]) ){
            if(col - j > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook - rookMoves.caller.caller == move? moveWhite(null, movePiece(matriz, row, col, row, j+1)).value: 0,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j+1)
                    }
                )
            }
            break;
        }

    }

    //* busca la primera pieza a la izquierda
    for (let j = col+1; j < 16; j++){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[row][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - rookMoves.caller.caller == move? moveWhite(null, movePiece(matriz, row, col, row, j)).value: 0,
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio a la derecha, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[row][j]) ){
            
            if (col - j > 1) {
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook - rookMoves.caller.caller == move? moveWhite(null, movePiece(matriz, row, col, row, j-1)).value: 0,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j-1)
                    }
                )
            }                
            break;
        }
    }
}

function bishopMoves(matriz, row, col){

    //* busca la primera pieza en diagonal inferior derecha
    loop:
    for (let i = row-1, j = col -1 ; i > 0 && j > 0; i--, j--){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if(Math.abs(row - i) > 1 && (Math.abs(col - j) > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i+1, j+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i+1,
                        to_col: j+1
                    }
                )
            }
            break loop;
        }
    }

    //* busca la primera pieza en diagonal inferior izquierda
    loop:
    for (let i = row-1, j = col+1; i > 0 && j < 16; i--, j++){
        
        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j])){
            if  (Math.abs(row - i) > 1 && (Math.abs(j - col) > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i+1,
                        to_col: j-1
                    }
                )
            }
            break loop;
        }
    }

    //* busca la primera pieza en diagonal superior derecha"
    loop: 
    for (let i = row+1, j = col-1; i < 16 && j > 0; i++, j--){
        
        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if (Math.abs(col - j) > 1 && Math.abs(i - row) > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop - moveWhite(movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i-1,
                        to_col: j+1
                    }
                )
            }
            break loop;
        }
    }

    //* busca la primera pieza en diagonal superior izquierda
    loop:
    for (let i = row+1, j = col+1; i < 16 && j < 16; i++, j++){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if( Math.abs(j - col) > 1 && Math.abs(i - row ) > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i-1, j-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i-1,
                        to_col: j-1
                    }
                )
            }
            break loop;
        }
    }
}

function queenMoves(matriz, row, col){

    //* busca la primera pieza que encuentra adelante
    for (let i = row + 1 ; i < 16; i++){

        // si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][col])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) 
                        - moveWhite(movePiece(matriz, row, col, i, col), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][col])){
            if( i - row > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i-1, col), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: (i-1),
                        to_col: col
                    }
                )
            } 
            break;
        }
    } 

    //* busca la primera pieza que encuentra atras
    for (let i = row-1; i > 0; i--){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][col])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating)  - moveWhite(movePiece(matriz, row, col, i, col),iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio adelante, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][col])){
            if ((row - i > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, col),iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: (i+1),
                        to_col: col
                    }
                )    
            }
            break;

        }
    } 

    //* busca la primera pieza a la derecha
    for (let j = col-1; j > 0; j--){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[row][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio a la derecha, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[row][j]) ){
            if(col - j > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, row, j+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j+1)
                    }
                )
            }
            break;
        }

    }

    //* busca la primera pieza a la izquierda
    for (let j = col+1; j < 16; j++){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[row][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break;
        }

        //si encuentra una negra con un espacio vacio a la derecha, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[row][j]) ){
            
            if (col - j > 1) {
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, row, j-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j-1)
                    }
                )
            }                
            break;
        }

    }

    //* busca la primera pieza en diagonal inferior derecha
    loop:
    for (let i = row-1, j = col -1 ; i > 0 && j > 0; i--, j--){
   
        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if(Math.abs(row - i) > 1 && (Math.abs(col - j) > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, j+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i+1,
                        to_col: j+1
                    }
                )
            }
            break loop;
        }
        
    }

    //* busca la primera pieza en diagonal inferior izquierda
    loop:
    for (let i = row-1, j = col+1; i > 0 && j < 16; i--, j++){
        
        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j])){
            if  (Math.abs(row - i) > 1 && (Math.abs(j - col) > 1)){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i+1,
                        to_col: j-1
                    }
                )
            }
            break loop;
        }
        
    }

    //* busca la primera pieza en diagonal superior derecha"
    loop: 
    for (let i = row+1, j = col-1; i < 16 && j > 0; i++, j--){
        
        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if (Math.abs(col - j) > 1 && Math.abs(i - row) > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i-1,
                        to_col: j+1
                    }
                )
            }
            break loop;
        }
    }

    //* busca la primera pieza en diagonal superior izquierda
    loop:
    for (let i = row+1, j = col+1; i < 16 && j < 16; i++, j++){

        //si encuentra una blanca, la come
        if(whitePieces.includes(matriz[i][j])){
            possibleMovementsBlack.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )

            break loop;
        }

        //si encuentra una negra con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(blackPieces.includes(matriz[i][j]) ){
            if( Math.abs(j - col) > 1 && Math.abs(i - row ) > 1){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen - moveWhite(null, movePiece(matriz, row, col, i-1, j-1)).value,
                        from_row: row,
                        from_col: col,
                        to_row: i-1,
                        to_col: j-1
                    }
                )
            }
            break loop;
        }
    }
}

function pawnMoves(matriz, row, col){

    //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
    if((row == 3) && matriz[row+1][col] == ' ' && matriz[row+2][col] == ' ' ){

        possibleMovementsBlack.push(
            {
                value: ((valuePieces.Pawn) * weightPieces.firstRowPawn) - moveWhite( movePiece(matriz, row, col, row+2, col), iterLevel-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+2),
                to_col: col
            }
        )
    }

    //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
    if((row == 2 ) && matriz[row+1][col] == ' ' && matriz[row+2][col] == ' ' ){
        possibleMovementsBlack.push(
            {
                value: ((valuePieces.Pawn) * weightPieces.secondRowPawn) - moveWhite( movePiece(matriz, row, col, row+2, col), iterLevel-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+2),
                to_col: col
            }
        )
    }
    console.log(row, col, matriz)
    //si tiene algo blanco a la izquierda para comer, que lo coma
    if((whitePieces.includes(matriz[row+1][col+1]))){
        possibleMovementsBlack.push(
            {
                value: ((valuePieces[letterToName[matriz[row+1][col+1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col+1), iterLevel-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+1),
                to_col: (col+1)
            }
        )
    }

    //si tiene algo blanco a la derecha para comer, que lo coma
    if(whitePieces.includes(matriz[row+1][col-1])){

        possibleMovementsBlack.push(
            {
                value: ((valuePieces[letterToName[matriz[row+1][col-1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col-1), iterLevel-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+1),
                to_col: (col-1)
            }
        )
    }

    //si no tiene nada adelante, y en la fila 7 no hay otra pieza, que se mueva 1 fila
    if(matriz[row+1][col] == ' ' && matriz[7][col] == ' '){
        
        possibleMovementsBlack.push(
            {
                //entre mas cerca este de convertirse en reina (fila 8), mas alto el puntaje
                value: ((valuePieces.Pawn) * weightPieces.movingFowardPawn - ((7-row-1) * 10)) - moveWhite( movePiece(matriz, row, col, row+1, col), iterLevel-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+1),
                to_col: col
            }
        )
    }
}

module.exports.moveBlack = moveBlack;