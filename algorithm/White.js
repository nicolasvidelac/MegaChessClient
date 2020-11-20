const { blackPieces, whitePieces } = require("../enums/pieces");
const { letterToName } = require('../enums/letterToName');
const { valuePieces } = require("../enums/valuePieces");
const weightPieces = require("../enums/weightPieces").weightPieces;

//arreglo donde guardo todos los posibles movimientos a hacer esta jugada
let possibleMovementsWhite = [];
let movesWhite = 0;

function moveWhite(data) {


    //vacio el arreglo porque tiene movimientos de la jugada anterior
    possibleMovementsWhite = [ ];


    //genero una matriz con el board que se me pasa
    let matriz = makeMatriz(data);
    
    //itero sobre toda la matriz buscando mis piezas
     for(let col = 0; col < 16; col++){
        for(let row = 15; row > 0; row--){

            switch (matriz[row][col]){

                case whitePieces[0]://Pawn
                    pawnMoves(matriz, row, col)
                    break;

                case whitePieces[1]://Rook
                    break;

                case whitePieces[2]://Bishop
                    break;

                case whitePieces[3]://Horse
                    break;

                case whitePieces[4]://Queen
                    queenMoves(matriz, row, col)
                    break;

                case whitePieces[5]://King
                    break;

                default:
                    break;
            }
        }
    }

    // busco cual de los resultados es el que tiene el mayor valor.
    let max = 0; 

    possibleMovementsWhite.forEach(pm => {
        if (pm.value >= max){
            max = pm.value
        }
    })

    // guardo el indice de ese maximo
    let index = 0;
    index = possibleMovementsWhite.findIndex( s => s.value == max);

    // console.log(matriz)

    // console.log( movesWhite)
    // movesWhite++;

    let result;
    if (max > 0){
        result = JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: possibleMovementsWhite[index].from_row,
                from_col: possibleMovementsWhite[index].from_col,
                to_row: possibleMovementsWhite[index].to_row,
                to_col: possibleMovementsWhite[index].to_col,
            }
        })
    }
    else {
        result = JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: 0,
                from_col: 0,
                to_row: 0,
                to_col: 0,
            }
        })
    }

    // devuelvo un json con los datos desde y hacia del movimiento de mayor valor
    return result;

}

 function queenMoves(matriz, row, col){

    loop:
    //* busca la primera pieza que encuentra adelante
    for (let i = row - 1; i > 0; i--){

        //busco una negra para comer
        if(blackPieces.includes(matriz[i][col])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )
            break loop;
        }

        //busco una blanca para saber hasta adonde me puedo mover
        else if(whitePieces.includes(matriz[i][col])){

            //comprueba que este a mas de un lugar de distancia esa pieza
            if(row - i > 1){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
                        from_row: row,
                        from_col: col,
                        to_row: (i+1),
                        to_col: col
                    }
                )
            } 

            break loop;
        }
    } 

    //* busca la primera pieza que encuentra atras
    loop:
    for (let i = row+1; i < 16; i++){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[i][col])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: col
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio adelante, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[i][col])){
            if ((i - row > 1)){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
                        from_row: row,
                        from_col: col,
                        to_row: (i-1),
                        to_col: col
                    }
                )    
            }

            break loop;

        }
    } 

    //* busca la primera pieza a la izquierda
    loop:
    for (let j = col - 1; j > 0; j--){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[row][j])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio a la derecha, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[row][j]) ){
            if(col - j > 1){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j+1)
                    }
                )
            }

            break loop;
        }

    }

    //* busca la primera pieza a la derecha
    loop:
    for (let j = col + 1; j < 16; j++){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[row][j])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: row,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio a la izquierda, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[row][j]) ){
            if (col - j > 1) {
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: (j-1)
                    }
                )
            }                
            break loop;
        }

    }

    //* busca la primera pieza en diagonal superior izquierda
    loop:
    for (let i = row - 1, j = col - 1; i > 0 && j > 0; i--, j--){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[i][j])){
            possibleMovementsWhite.push(
                {
                    value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating,
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[i][j])){
            if((row - i > 1) && (col - j > 1)){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
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

    //* busca la primera pieza en diagonal superior derecha
    loop:
    for (let i = row - 1, j = col + 1; i > 0 && j < 16; i--, j++){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[i][j])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[i][j])){
            if  (row - i > 1 &&  (j - col > 1)){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
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

    //* busca la primera pieza en diagonal inferior izquierda"
    loop: 
    for (let i = row + 1, j = col - 1; i < 16 && j > 0; i++, j--){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[i][j])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[i][j]) ){
            if ((col - j > 1) && (i - row > 1)){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
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

    //* busca la primera pieza en diagonal inferior derecha
    loop:
    for (let i = row + 1, j = col + 1; i < 16 && j < 16; i++, j++){

        //si encuentra una negra, la come
        if(blackPieces.includes(matriz[i][j])){
            possibleMovementsWhite.push(
                {
                    value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating),
                    from_row: row,
                    from_col: col,
                    to_row: i,
                    to_col: j
                }
            )
            break loop;
        }

        //si encuentra una blanca con un espacio vacio atras, 
        //se mueve a ese espacio
        else if(whitePieces.includes(matriz[i][j]) ){
            if((j - col > 1) && (i - row > 1)){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen,
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
    if((row == 12) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){

        possibleMovementsWhite.push(
            {
                value: ((valuePieces.Pawn) * weightPieces.firstRowPawn),
                from_row: row,
                from_col: col,
                to_row: (row-2),
                to_col: col
            }
        )
    }
        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
    if((row == 13 ) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){

        possibleMovementsWhite.push(
            {
                value: ((valuePieces.Pawn) * weightPieces.secondRowPawn),
                from_row: row,
                from_col: col,
                to_row: (row-2),
                to_col: col
            }
        )
    }

    //si tiene algo negro a la derecha para comer, que lo coma
    if((blackPieces.includes(matriz[row-1][col+1]))){
        possibleMovementsWhite.push(
            {
                value: ((valuePieces[letterToName[matriz[row-1][col+1]]]) * weightPieces.eating),
                from_row: row,
                from_col: col,
                to_row: (row-1),
                to_col: (col+1)
            }
        )
    }

    //si tiene algo negro a la izquierda para comer, que lo coma
    if(blackPieces.includes(matriz[row-1][col-1])){

        possibleMovementsWhite.push(
            {
                value: ((valuePieces[letterToName[matriz[row-1][col-1]]]) * weightPieces.eating),
                from_row: row,
                from_col: col,
                to_row: (row-1),
                to_col: (col-1)
            }
        )
    }

    //si no tiene nada adelante, y en la fila 8 no hay otra pieza, que se mueva 1 fila
    if(matriz[row-1][col] == ' ' && matriz[8][col] == ' '){
        
        possibleMovementsWhite.push(
            {
                //entre mas cerca este de convertirse en reina (fila 8), mas alto el puntaje
                value: ((valuePieces.Pawn) * weightPieces.movingFowardPawn - ((row-8-1) * 10)),
                from_row: row,
                from_col: col,
                to_row: (row-1),
                to_col: col
            }
        

        )
    }

    
}

function makeMatriz(data){
    let board = data.board;

    let index = 0;
    let matriz = [];

    for (let i = 0; i < 16; i++){
        let row = [];
        for(let j = 0; j<16; j++){
            row.push(board[index]);
            index++;
        }
        matriz.push(row)
    }

    return matriz;
}


module.exports.moveWhite = moveWhite;