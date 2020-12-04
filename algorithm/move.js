const { letterToName} = require("../enums/letterToName");
const { blackPieces, whitePieces } = require("../enums/pieces");
const { whitePlaceWeight, blackPlaceWeight } = require("../enums/placeWeight");
const { valuePieces} = require("../enums/valuePieces");
const { weightPieces} = require("../enums/weightPieces");
const { movePiece } = require("../utilities/movePiece");

//nivel de profundidad con la que itero los resultados
let deepness = 3;

//cantidad de lugares vacios que pueden encontrar y continuar buscando las reinas, alfiles y torres
let stopMeter = 2;

function moveWhite(matriz, depth = deepness) {

    //si depth es 0, es porque se llego al fin del bucle 
    if(depth == 0){
        return { value: 0 }
    }
    
    //vacio el arreglo porque tiene movimientos de la jugada anterior
    let possibleMovementsWhite = [];
    
    //itero sobre toda la matriz buscando mis piezas 
    //y ejecuto la funcion correspondiente cuando encuentro una pieza
     for( let col = 0; col < 16; col++ ){
        for( let row = 15; row > 0; row-- ){

            switch (matriz[row][col]){

                case whitePieces[0]: //Pawn
                    WhitePawnMoves(matriz, row, col)
                    break;

                case whitePieces[1]: //Rook
                    WhiteRookMoves(matriz, row, col)
                    break;

                case whitePieces[2]: //Bishop
                    WhiteBishopMoves(matriz, row, col)
                    break;

                case whitePieces[3]: //Horse
                    WhiteHorseMoves(matriz, row, col)
                    break;

                case whitePieces[4]: //Queen
                    WhiteQueenMoves(matriz, row, col)
                    break;

                case whitePieces[5]: //King
                    WhiteKingMoves(matriz, row, col)
                    break;

                default:
                    break;
            }
        }
    }

    // busco cual de los resultados es el que tiene el mayor valor.
    let max = -10000; 

    possibleMovementsWhite.forEach(pm => {
        if (pm.value >= max){
            max = pm.value
        }
    })
    
    // guardo el indice de ese maximo
    let index = 0;
    index = possibleMovementsWhite.findIndex( s => s.value == max);

    let result = {
        value: possibleMovementsWhite[index].value,
        from_row: possibleMovementsWhite[index].from_row,
        from_col: possibleMovementsWhite[index].from_col,
        to_row: possibleMovementsWhite[index].to_row,
        to_col: possibleMovementsWhite[index].to_col,
    }

    // devuelvo los datos desde y hacia del movimiento de mayor valor
    return result;
    
    function WhiteHorseMoves(matriz, row, col){
        
        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {
                if ( 1 < row && row < 14 && 0 < col && col < 15 ) {
                    if(blackPieces.includes(matriz[row+i][col+j])){
                        possibleMovementsWhite.push(
                            {
                                value: (valuePieces[letterToName[matriz[row+i][col+j]]]) * weightPieces.eating + whitePlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                    
                    else if(matriz[row+i][col+j] == ' '){
                        possibleMovementsWhite.push(
                            {
                                value: valuePieces.Horse + whitePlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value ,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                }
            }
        }

        for (let i = -1; i < 2; i += 2) {
            for (let j = -2; j < 3; j += 4) {

                if( 0 < row && row < 14 && 1 < col && col < 15 ){
                    if(blackPieces.includes(matriz[row+i][col+j])){
                        possibleMovementsWhite.push(
                            {
                                value: (valuePieces[letterToName[matriz[row+i][col+j]]]) * weightPieces.eating + whitePlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                    
                    else if(matriz[row+i][col+j] == ' '){
                        possibleMovementsWhite.push(
                            {
                                value: valuePieces.Horse + whitePlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value ,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                }

            }
        }
    }

    function WhiteKingMoves(matriz, row, col){

        for(let i = row - 1; 0 < i && i <= row + 1 && i < 16; i++){
            for(let j = col - 1; 0 < j && j <= col + 1 && j < 16; j++){

                //que no analice la misma posicion adonde esta
                if(j == col && i == row){
                    continue;
                }

                //si hay una negra adelante, la come
                if(blackPieces.includes(matriz[i][j])){
                    possibleMovementsWhite.push(
                        {
                            value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.kingEval[i][j],
                            from_row: row,
                            from_col: col,
                            to_row: i,
                            to_col: j
                        }
                    )
                    continue;
                }

                //si no hay nada adelante, se mueve ahi
                else if(matriz[i][j] == ' '){
                    possibleMovementsWhite.push(
                        {
                            value: valuePieces.King - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.kingEval[i][j],
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

    function WhiteRookMoves(matriz, row, col){
        
        loop:
        //* busca la primera pieza que encuentra adelante
        for (let i = row - 1, stop = stopMeter; i > 0; i--){

            //busco una negra para comer
            if(blackPieces.includes(matriz[i][col])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value + whitePlaceWeight.rookEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Rook + whitePlaceWeight.rookEval[i][col] - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][col])){
                break loop;
            }
        }
            

        //* busca la primera pieza que encuentra atras
        loop:
        for (let i = row+1, stop = stopMeter; i < 16; i++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][col])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, i, col), depth-1).value + whitePlaceWeight.rookEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Rook + whitePlaceWeight.rookEval[i][col] - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][col])){
                break loop;
            }
        } 

        //* busca la primera pieza a la izquierda
        loop:
        for (let j = col - 1, stop = stopMeter; j > 0; j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[row][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), depth-1).value + whitePlaceWeight.rookEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Rook + whitePlaceWeight.rookEval[row][j] - moveBlack( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[row][j])){
                break loop;
            }
        }

        //* busca la primera pieza a la derecha
        loop:
        for (let j = col + 1, stop = stopMeter; j < 16; j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[row][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), depth-1).value + whitePlaceWeight.rookEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Rook + whitePlaceWeight.rookEval[row][j] - moveBlack( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[row][j])){
                break loop;
            }
        }
        
    }

    function WhiteBishopMoves(matriz, row, col){
        
        //* busca la primera pieza en diagonal superior izquierda
        loop:
        for (let i = row - 1, j = col - 1, stop = stopMeter; i > 0 && j > 0; i--, j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveBlack( movePiece( matriz, row, col, i, j), depth-1).value + whitePlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Bishop + whitePlaceWeight.bishopEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal superior derecha
        loop:
        for (let i = row - 1, j = col + 1, stop = stopMeter; i > 0 && j < 16; i--, j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating)  - moveBlack( movePiece( matriz, row, col, i+1, col), depth-1).value + whitePlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Bishop + whitePlaceWeight.bishopEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal inferior izquierda"
        loop: 
        for (let i = row + 1, j = col - 1, stop = stopMeter; i < 16 && j > 0; i++, j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Bishop + whitePlaceWeight.bishopEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal inferior derecha
        loop:
        for (let i = row + 1, j = col + 1, stop = stopMeter; i < 16 && j < 16; i++, j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Bishop + whitePlaceWeight.bishopEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }
        
    }

    function WhiteQueenMoves(matriz, row, col){

        loop:
        //* busca la primera pieza que encuentra adelante
        for (let i = row - 1, stop = stopMeter; i > 0; i--){

            //busco una negra para comer
            if(blackPieces.includes(matriz[i][col])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value + whitePlaceWeight.queenEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][col] - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][col])){
                break loop;
            }
        }
            

        //* busca la primera pieza que encuentra atras
        loop:
        for (let i = row+1, stop = stopMeter; i < 16; i++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][col])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, i, col), depth-1).value + whitePlaceWeight.queenEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][col] - moveBlack( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][col])){
                break loop;
            }
        } 

        //* busca la primera pieza a la izquierda
        loop:
        for (let j = col - 1, stop = stopMeter; j > 0; j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[row][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), depth-1).value + whitePlaceWeight.queenEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[row][j] - moveBlack( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[row][j])){
                break loop;
            }
        }

        //* busca la primera pieza a la derecha
        loop:
        for (let j = col + 1, stop = stopMeter; j < 16; j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[row][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), depth-1).value + whitePlaceWeight.queenEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[row][j] - moveBlack( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[row][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal superior izquierda
        loop:
        for (let i = row - 1, j = col - 1, stop = stopMeter; i > 0 && j > 0; i--, j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveBlack( movePiece( matriz, row, col, i, j), depth-1).value + whitePlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal superior derecha
        loop:
        for (let i = row - 1, j = col + 1, stop = stopMeter; i > 0 && j < 16; i--, j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating)  - moveBlack( movePiece( matriz, row, col, i+1, col), depth-1).value + whitePlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal inferior izquierda"
        loop: 
        for (let i = row + 1, j = col - 1, stop = stopMeter; i < 16 && j > 0; i++, j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }

        //* busca la primera pieza en diagonal inferior derecha
        loop:
        for (let i = row + 1, j = col + 1, stop = stopMeter; i < 16 && j < 16; i++, j++){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleMovementsWhite.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value + whitePlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }

            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsWhite.push(
                    {
                        value: valuePieces.Queen + whitePlaceWeight.queenEval[i][j] - moveBlack( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una blanca, salite
            else if (whitePieces.includes(matriz[i][j])){
                break loop;
            }
        }
    }

    function WhitePawnMoves(matriz, row, col){

        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 12) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){
            
            let matrizNegra = movePiece(matriz,row,col,row-2,col);

            possibleMovementsWhite.push(
                {
                    value: whitePlaceWeight.pawnEval[row-2][col] - moveBlack(matrizNegra, depth-1).value,
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
                    value: whitePlaceWeight.pawnEval[row-2][col] - moveBlack( movePiece(matriz,row,col,row-2,col), depth-1).value,
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
                    value: whitePlaceWeight.pawnEval[row-1][col+1] + (valuePieces[letterToName[matriz[row-1][col+1]]]) * weightPieces.eating - moveBlack(movePiece(matriz, row, col, row-1, col+1), depth-1).value,
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
                    value: whitePlaceWeight.pawnEval[row-1][col-1] + (valuePieces[letterToName[matriz[row-1][col-1]]]) * weightPieces.eating - moveBlack(movePiece(matriz, row, col, row-1, col-1), depth-1).value,
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
                    value: whitePlaceWeight.pawnEval[row-1][col] - moveBlack(movePiece(matriz, row, col, row-1, col), depth-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-1),
                    to_col: col
                }
            )
        }
    }
}

function moveBlack(matriz, depth = deepness) {

    //si depth es 0, es porque se llego al fin del bucle 
    if(depth == 0){
        return {value: 0}
    }

    //vacio el arreglo porque tiene movimientos de la jugada anterior
    let possibleMovementsBlack = [ ];
    
    //itero sobre toda la matriz buscando mis piezas
    for(let col = 0; col < 16; col++){
        for(let row = 0; row < 16; row++){

            switch (matriz[row][col]){

                case blackPieces[0]://Pawn
                    blackPawnMoves(matriz, row, col);
                    break;

                case blackPieces[1]://Rook
                    blackRookMoves(matriz, row, col);
                    break;

                case blackPieces[2]://Bishop
                    blackBishopMoves(matriz, row, col);
                    break;

                case blackPieces[3]://Horse
                    blackHorseMoves(matriz, row, col);
                    break;

                case blackPieces[4]://Queen
                    blackQueenMoves(matriz, row, col);
                    break;

                case blackPieces[5]://King
                    blackKingMoves(matriz, row, col);
                    break;

                default:
                    break;
            }

        }
    }

    // busco cual de los resultados es el que tiene el mayor valor.
    let max = -100000; 

    possibleMovementsBlack.forEach(pm => {
        if (pm.value >= max){
            max = pm.value
        }
    })

    // guardo el indice de ese maximo
    let index = 0;
    index = possibleMovementsBlack.findIndex( s => s.value == max);

    let result = {
        value: possibleMovementsBlack[index].value,
        from_row: possibleMovementsBlack[index].from_row,
        from_col: possibleMovementsBlack[index].from_col,
        to_row: possibleMovementsBlack[index].to_row,
        to_col: possibleMovementsBlack[index].to_col,
    }
    
    // devuelvo los datos desde y hacia del movimiento de mayor valor
    return result;

    function blackHorseMoves(matriz, row, col){

        for (let i = -2; i < 3; i += 4) {
            for (let j = -1; j < 2; j += 2) {
                if ( 1 < row && row < 14 && 0 < col && col < 15 ) {
                    if(whitePieces.includes(matriz[row+i][col+j])){
                        possibleMovementsBlack.push(
                            {
                                value: (valuePieces[letterToName[matriz[row+i][col+j]]]) * weightPieces.eating + whitePlaceWeight.horseEval[row+i][col+j] - moveWhite( movePiece(matriz, row, col, row+i, col+j), depth-1).value,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                    
                    else if(matriz[row+i][col+j] == ' '){
                        possibleMovementsBlack.push(
                            {
                                value: valuePieces.Horse + blackPlaceWeight.horseEval[row+i][col+j] - moveWhite( movePiece(matriz, row, col, row+i, col+j), depth-1).value ,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                }
            }
        }

        for (let i = -1; i < 2; i += 2) {
            for (let j = -2; j < 3; j += 4) {

                if( 0 < row && row < 14 && 1 < col && col < 15 ){
                    if(whitePieces.includes(matriz[row+i][col+j])){
                        possibleMovementsBlack.push(
                            {
                                value: (valuePieces[letterToName[matriz[row+i][col+j]]]) * weightPieces.eating + whitePlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                    
                    else if(matriz[row+i][col+j] == ' '){
                        possibleMovementsBlack.push(
                            {
                                value: valuePieces.Horse + blackPlaceWeight.horseEval[row+i][col+j] - moveBlack( movePiece(matriz, row, col, row+i, col+j), depth-1).value ,
                                from_row: row,
                                from_col: col,
                                to_row: row+i,
                                to_col: col+j
                            }
                        )
                    }
                }

            }
        }
    }
    
    function blackKingMoves(matriz, row, col){
    
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
                            value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.kingEval[i][j],
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
                            value:( valuePieces.King - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.kingEval[i][j],
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
    
    function blackRookMoves(matriz, row, col){
        
        //* busca la primera pieza que encuentra adelante
        for (let i = row + 1, stop = stopMeter ; i < 16; i++){
        
            // si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, col), depth-1).value) + blackPlaceWeight.rookEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook + blackPlaceWeight.rookEval[i][col] - moveWhite( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][col])){
                break
            }
        } 

        //* busca la primera pieza que encuentra atras
        for (let i = row-1, stop = stopMeter; i > 0; i--){

            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating)  - moveWhite(movePiece(matriz, row, col, i, col),depth-1).value) + blackPlaceWeight.rookEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook + blackPlaceWeight.rookEval[i][col] - moveWhite( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][col])){
                break
            }

        }
        
        //* busca la primera pieza a la derecha
        for (let j = col-1, stop = stopMeter; j > 0; j--){

            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[row][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), depth-1).value) + blackPlaceWeight.rookEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook + blackPlaceWeight.rookEval[row][j] - moveWhite( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[row][j])){
                break
            }
        }

        //* busca la primera pieza a la izquierda
        for (let j = col+1, stop = stopMeter; j < 16; j++){

            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[row][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), depth-1).value) + blackPlaceWeight.rookEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Rook + blackPlaceWeight.rookEval[row][j] - moveWhite( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[row][j])){
                break
            }
        }
    }
    
    function blackBishopMoves(matriz, row, col){
        //* busca la primera pieza en diagonal inferior derecha
        loop:
        for (let i = row-1, j = col -1, stop = stopMeter; i > 0 && j > 0; i--, j--){
        
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop + blackPlaceWeight.bishopEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
            
        }

        //* busca la primera pieza en diagonal inferior izquierda
        loop:
        for (let i = row-1, j = col+1, stop = stopMeter; i > 0 && j < 16; i--, j++){
            
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop + blackPlaceWeight.bishopEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;

            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    
        //* busca la primera pieza en diagonal superior derecha"
        loop: 
        for (let i = row+1, j = col-1, stop = stopMeter; i < 16 && j > 0; i++, j--){
            
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop + blackPlaceWeight.bishopEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    
        //* busca la primera pieza en diagonal superior izquierda
        loop:
        for (let i = row+1, j = col+1, stop = stopMeter; i < 16 && j < 16; i++, j++){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.bishopEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
    
                break loop;
            }
    
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Bishop + blackPlaceWeight.bishopEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    }
    
    function blackQueenMoves(matriz, row, col){

        //* busca la primera pieza que encuentra adelante
        for (let i = row + 1, stop = stopMeter ; i < 16; i++){
    
            // si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, col), depth-1).value) + blackPlaceWeight.queenEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][col] - moveWhite( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][col])){
                break
            }
        } 

        //* busca la primera pieza que encuentra atras
        for (let i = row-1, stop = stopMeter; i > 0; i--){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating)  - moveWhite(movePiece(matriz, row, col, i, col),depth-1).value) + blackPlaceWeight.queenEval[i][col],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][col] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][col] - moveWhite( movePiece(matriz, row, col, i, col), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: col
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][col])){
                break
            }

        }
        
        //* busca la primera pieza a la derecha
        for (let j = col-1, stop = stopMeter; j > 0; j--){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[row][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), depth-1).value) + blackPlaceWeight.queenEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[row][j] - moveWhite( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[row][j])){
                break
            }
        }
    
        //* busca la primera pieza a la izquierda
        for (let j = col+1, stop = stopMeter; j < 16; j++){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[row][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), depth-1).value) + blackPlaceWeight.queenEval[row][j],
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                break;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[row][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[row][j] - moveWhite( movePiece(matriz, row, col, row, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[row][j])){
                break
            }
        }
        
        //* busca la primera pieza en diagonal inferior derecha
        loop:
        for (let i = row-1, j = col -1, stop = stopMeter; i > 0 && j > 0; i--, j--){
       
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop --;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
            
        }

        //* busca la primera pieza en diagonal inferior izquierda
        loop:
        for (let i = row-1, j = col+1, stop = stopMeter; i > 0 && j < 16; i--, j++){
            
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;

            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    
        //* busca la primera pieza en diagonal superior derecha"
        loop: 
        for (let i = row+1, j = col-1, stop = stopMeter; i < 16 && j > 0; i++, j--){
            
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                break loop;
            }
            
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--;
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    
        //* busca la primera pieza en diagonal superior izquierda
        loop:
        for (let i = row+1, j = col+1, stop = stopMeter; i < 16 && j < 16; i++, j++){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleMovementsBlack.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value) + blackPlaceWeight.queenEval[i][j],
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
    
                break loop;
            }
    
            //si hay espacio vacio, movete ahi
            else if(matriz[i][j] == ' ' && stop > 0){
                possibleMovementsBlack.push(
                    {
                        value: valuePieces.Queen + blackPlaceWeight.queenEval[i][j] - moveWhite( movePiece(matriz, row, col, i, j), depth-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: i,
                        to_col: j
                    }
                )
                stop--
                continue;
            }
        
            //si encontras una negra, salite
            else if (blackPieces.includes(matriz[i][j])){
                break
            }
        }
    }
    
    function blackPawnMoves(matriz, row, col){
    
        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 3) && matriz[row+1][col] == ' ' && matriz[row+2][col] == ' ' ){
            let matrizBlanca = movePiece(matriz, row, col, row+2, col);
            possibleMovementsBlack.push(
                {
                    value: blackPlaceWeight.pawnEval[row+2][col] - moveWhite( matrizBlanca, depth-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row+2),
                    to_col: col
                }
            )
        }
    
        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 2 ) && matriz[row+1][col] == ' ' && matriz[row+2][col] == ' ' ){
            let matrizBlanca = movePiece(matriz, row, col, row+2, col)
            possibleMovementsBlack.push(
                {
                    value: blackPlaceWeight.pawnEval[row+2][col] - moveWhite( matrizBlanca , depth-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row+2),
                    to_col: col
                }
            )
        }
        
        //si tiene algo blanco a la izquierda para comer, que lo coma
        if((row < 15 && col <15 && whitePieces.includes(matriz[row+1][col+1]))){
            let matrizBlanca = movePiece(matriz, row, col, row+1, col+1)
            possibleMovementsBlack.push(
                {
                value: blackPlaceWeight.pawnEval[row+1][col+1] + (valuePieces[letterToName[matriz[row+1][col+1]]]) * weightPieces.eating - moveWhite( matrizBlanca, depth-1).value,
                from_row: row,
                from_col: col,
                to_row: (row+1),
                to_col: (col+1)
                }
            )
        }
    
        //si tiene algo blanco a la derecha para comer, que lo coma
        if(row < 15 && whitePieces.includes(matriz[row+1][col-1])){
            let matrizBlanca = movePiece(matriz, row, col, row+1, col-1)
            possibleMovementsBlack.push(
                {
                    value: blackPlaceWeight.pawnEval[row+1][col-1] + (valuePieces[letterToName[matriz[row+1][col-1]]]) * weightPieces.eating - moveWhite( matrizBlanca, depth-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row+1),
                    to_col: (col-1)
                }
            )
        }
    
        //si no tiene nada adelante, y en la fila 7 no hay otra pieza, que se mueva 1 fila
        if(row < 15 && matriz[row+1][col] == ' ' && matriz[7][col] == ' '){
            let matrizBlanca = movePiece(matriz, row, col, row+1, col)
            possibleMovementsBlack.push(
                {
                    //entre mas cerca este de convertirse en reina (fila 8), mas alto el puntaje
                    value: blackPlaceWeight.pawnEval[row+1][col] - moveWhite(matrizBlanca, depth-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row+1),
                    to_col: col
                }
            )
        }
    }
}

module.exports = {
    moveBlack : moveBlack,
    moveWhite : moveWhite,
}