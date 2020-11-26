const { letterToName} = require("../enums/letterToName");
const { blackPieces, whitePieces } = require("../enums/pieces");
const { valuePieces} = require("../enums/valuePieces");
const { weightPieces} = require("../enums/weightPieces");
const { movePiece } = require("../extras/movePiece");

function moveWhite(matriz, iterDeep = 3) {

    let iterLevel = iterDeep
    //si iterLevel es 0, es porque se llego al fin del bucle 
    if(iterLevel == 0){
        // console.log("iterLevelWhite: ", iterLevel)
        return { value: 0 }
    }

    //vacio el arreglo porque tiene movimientos de la jugada anterior
    let possibleMovementsWhite = [];
    
    //itero sobre toda la matriz buscando mis piezas 
    //y ejecuto la funcion correspondiente cuando encuentro una pieza
     for(let col = 0; col < 16; col++){
        for(let row = 15; row > 0; row--){

            switch (matriz[row][col]){

                case whitePieces[0]: //Pawn
                    let pawn =  WhitePawnMoves(matriz, row, col)
                    for (let index = 0; index < pawn.length; index++) {
                        possibleMovementsWhite.push(pawn[index]);
                    }
                    break;

                case whitePieces[1]: //Rook
                    let rook =  WhiteRookMoves(matriz, row, col)
                    for (let index = 0; index < rook.length; index++) {
                        possibleMovementsWhite.push(rook[index]);
                    }
                    break;

                case whitePieces[2]: //Bishop
                    let bishop =  WhiteBishopMoves(matriz, row, col)
                    for (let index = 0; index < bishop.length; index++) {
                        possibleMovementsWhite.push(bishop[index]);
                    }
                    break;

                case whitePieces[3]: //Horse
                    let horse =  WhiteHorseMoves(matriz, row, col)
                    for (let index = 0; index < horse.length; index++) {
                        possibleMovementsWhite.push(horse[index]);
                    }
                    break;

                case whitePieces[4]: //Queen
                    let queen =  WhiteQueenMoves(matriz, row, col)
                    for (let index = 0; index < queen.length; index++) {
                        possibleMovementsWhite.push(queen[index]);
                    }
                    break;

                case whitePieces[5]: //King
                    let king =  WhiteKingMoves(matriz, row, col)
                    for (let index = 0; index < king.length; index++) {
                        possibleMovementsWhite.push(king[index]);
                    }
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

        let possibleWhiteHorseMovements = [];

        if (row < 14 && col < 15){
            //come en ese lugar
            if (blackPieces.includes(matriz[row+2][col+1])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row+2][col+1]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col+1
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row+2][col+1] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value,
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
            if (blackPieces.includes(matriz[row+1][col+2])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row+1][col+2]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+1,
                        to_col: col+2
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row+1][col+2] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value,
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
            if (blackPieces.includes(matriz[row-2][col+1])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row-2][col+1]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row-2,
                        to_col: col+1
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row-2][col+1] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value,
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
            if (blackPieces.includes(matriz[row-1][col+2])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row-1][col+2]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row-1,
                        to_col: col+2
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row-1][col+2] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value,
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
            if (blackPieces.includes(matriz[row-1][col-2])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row-1][col-2]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row-1,
                        to_col: col-2
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row-1][col-2] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value,
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
            if (blackPieces.includes(matriz[row-2][col-1])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row-2][col-1]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row-2,
                        to_col: col-1
                    }
                )
            }

            //se mueve a ese lugar
            else if(matriz[row-2][col-1] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row-2,
                        to_col: col-1
                    }
                )
            }
        }

        if(row < 15 && col > 1){
            if (blackPieces.includes(matriz[row+1][col-2])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row+1][col-2]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row+1, col-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+1,
                        to_col: col-2
                    }
                )
            }
        
            //se mueve a ese lugar
            else if(matriz[row+1][col-2] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row+1, col-2), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+1,
                        to_col: col-2
                    }
                )
            }
        }

        if(row < 14 && col > 0){
            if (blackPieces.includes(matriz[row+2][col-1])){
                possibleWhiteHorseMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row+2][col-1]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col-1
                    }
                )
            }
        
            //se mueve a ese lugar
            else if(matriz[row+2][col-1] == ' '){
                possibleWhiteHorseMovements.push(
                    {
                        value: valuePieces.Horse - moveBlack( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value,
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col-1
                    }
                )
            }
        }
        return possibleWhiteHorseMovements;
    }

    function WhiteKingMoves(matriz, row, col){

        let possibleWhiteKingMovements = [];

        for(let i = row - 1; 0 < i && i <= row + 1 && i < 16; i++){
            for(let j = col - 1; 0 < j && j <= col + 1 && j < 16; j++){

                //que no analice la misma posicion adonde esta
                if(j == col && i == row){
                    continue;
                }

                //si hay una negra adelante, la come
                if(blackPieces.includes(matriz[i][j])){
                    possibleWhiteKingMovements.push(
                        {
                            value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                            from_row: row,
                            from_col: col,
                            to_row: i,
                            to_col: j
                        }
                    )
                }

                //si no hay nada adelante, se mueve ahi
                else if(matriz[i][j] == ' '){
                    possibleWhiteKingMovements.push(
                        {
                            value: valuePieces.King - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
                            from_row: row,
                            from_col: col,
                            to_row: i,
                            to_col: j
                        }
                    )
                }
            }
        }

        return possibleWhiteKingMovements;
    }

    function WhiteRookMoves(matriz, row, col){
        
        let possibleWhiteRookMovements = [];

        loop:
        //* busca la primera pieza que encuentra adelante
        for (let i = row - 1; i > 0; i--){

            //busco una negra para comer
            if(blackPieces.includes(matriz[i][col])){
                possibleWhiteRookMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, col), iterLevel-1).value,
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
                    possibleWhiteRookMovements.push(
                        {
                            value: valuePieces.Rook - moveBlack( movePiece(matriz, row, col, i+1, col), iterLevel-1).value,
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
                possibleWhiteRookMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, col), iterLevel-1).value,
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
                    possibleWhiteRookMovements.push(
                        {
                            value: valuePieces.Rook - moveBlack( movePiece(matriz, row, col, i-1, col), iterLevel-1).value,
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
                possibleWhiteRookMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row, j), iterLevel-1).value,
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
                    possibleWhiteRookMovements.push(
                        {
                            value: valuePieces.Rook - moveBlack( movePiece(matriz, row, col, row, j+1), iterLevel-1).value,
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
                possibleWhiteRookMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, row, j), iterLevel-1).value,
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
                    possibleWhiteRookMovements.push(
                        {
                            value: valuePieces.Rook - moveBlack( movePiece(matriz, row, col, row, j-1), iterLevel-1).value,
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
        return possibleWhiteRookMovements;
    }

    function WhiteBishopMoves(matriz, row, col){

        let possibleWhiteBishopMovements = [];

        //* busca la primera pieza en diagonal superior izquierda
        loop:
        for (let i = row - 1, j = col - 1; i > 0 && j > 0; i--, j--){

            //si encuentra una negra, la come
            if(blackPieces.includes(matriz[i][j])){
                possibleWhiteBishopMovements.push(
                    {
                        value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteBishopMovements.push(
                        {
                            value: valuePieces.Bishop - moveBlack( movePiece(matriz, row, col, i+1, j+1), iterLevel-1).value,
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
                possibleWhiteBishopMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteBishopMovements.push(
                        {
                            value: valuePieces.Bishop - moveBlack( movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value,
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
                possibleWhiteBishopMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteBishopMovements.push(
                        {
                            value: valuePieces.Bishop - moveBlack( movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value,
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
                possibleWhiteBishopMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteBishopMovements.push(
                        {
                            value: valuePieces.Bishop - moveBlack( movePiece(matriz, row, col, i-1, j-1), iterLevel-1).value,
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
        return possibleWhiteBishopMovements;
    }

    function WhiteQueenMoves(matriz, row, col){

        let possibleWhiteQueenMovements = [];

        loop:
        //* busca la primera pieza que encuentra adelante
        for (let i = row - 1; i > 0; i--){

            //busco una negra para comer
            if(blackPieces.includes(matriz[i][col])){
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, col), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece( matriz, row, col, i+1, col), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, i, col), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece( matriz, row, col, i-1, col), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece( matriz, row, col, row, j+1), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveBlack( movePiece( matriz, row, col, row, j), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece( matriz, row, col, row, j-1), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveBlack( movePiece( matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece( matriz, row, col, i+1, j+1), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating)  - moveBlack( movePiece( matriz, row, col, i+1, col), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value,
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
                possibleWhiteQueenMovements.push(
                    {
                        value: ((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveBlack( movePiece(matriz, row, col, i, j), iterLevel-1).value,
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
                    possibleWhiteQueenMovements.push(
                        {
                            value: valuePieces.Queen - moveBlack( movePiece(matriz, row, col, i-1, j-1), iterLevel-1).value,
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
        return possibleWhiteQueenMovements;
    }

    function WhitePawnMoves(matriz, row, col){

        let possibleWhitePawnMovements = [];

        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 12) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){
            
            let matrizNegra = movePiece(matriz,row,col,row-2,col);

            possibleWhitePawnMovements.push(
                {
                    value: ((valuePieces.Pawn) * weightPieces.firstRowPawn) - moveBlack(matrizNegra, iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-2),
                    to_col: col
                }
            )
        }
        
        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 13 ) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){

            possibleWhitePawnMovements.push(
                {
                    value: ((valuePieces.Pawn) * weightPieces.secondRowPawn) - moveBlack( movePiece(matriz,row,col,row-2,col), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-2),
                    to_col: col
                }
            )
        }

        //si tiene algo negro a la derecha para comer, que lo coma
        if((blackPieces.includes(matriz[row-1][col+1]))){
            possibleWhitePawnMovements.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-1][col+1]]]) * weightPieces.eating) - moveBlack(movePiece(matriz, row, col, row-1, col+1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-1),
                    to_col: (col+1)
                }
            )
        }

        //si tiene algo negro a la izquierda para comer, que lo coma
        if(blackPieces.includes(matriz[row-1][col-1])){

            possibleWhitePawnMovements.push(
                {
                    value: ((valuePieces[letterToName[matriz[row-1][col-1]]]) * weightPieces.eating) - moveBlack(movePiece(matriz, row, col, row-1, col-1), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-1),
                    to_col: (col-1)
                }
            )
        }

        //si no tiene nada adelante, y en la fila 8 no hay otra pieza, que se mueva 1 fila
        if(matriz[row-1][col] == ' ' && matriz[8][col] == ' '){
            
            possibleWhitePawnMovements.push(
                {
                    //entre mas cerca este de convertirse en reina (fila 8), mas alto el puntaje
                    value: ((valuePieces.Pawn) * weightPieces.movingFowardPawn - ((row-8-1) * 10)) - moveBlack(movePiece(matriz, row, col, row-1, col), iterLevel-1).value,
                    from_row: row,
                    from_col: col,
                    to_row: (row-1),
                    to_col: col
                }
            )
        }
        return possibleWhitePawnMovements;
    }

}

function moveBlack(matriz, iterLevel = 3) {

    //si iterLevel es 0, es porque se llego al fin del bucle 
    if(iterLevel == 0){
        // console.log("iterLevelBlack: ", iterLevel)
        return {value: 0}
    }

    //vacio el arreglo porque tiene movimientos de la jugada anterior
    let possibleMovementsBlack = [ ];
    
    //itero sobre toda la matriz buscando mis piezas
    for(let col = 0; col < 16; col++){
        for(let row = 0; row < 16; row++){

            switch ( matriz[row][col]){

                case blackPieces[0]://Pawn
                    let pawn = blackPawnMoves(matriz, row, col);
                    for (let index = 0; index < pawn.length; index++) {
                        possibleMovementsBlack.push(pawn[index]);
                    }
                    break;

                case blackPieces[1]://Rook
                    let rook = blackRookMoves(matriz, row, col);
                    for (let index = 0; index < rook.length; index++) {
                        possibleMovementsBlack.push(rook[index]);
                    }
                    break;

                case blackPieces[2]://Bishop
                    let bishop = blackBishopMoves(matriz, row, col);
                    for (let index = 0; index < bishop.length; index++) {
                        possibleMovementsBlack.push(bishop[index]);
                    }
                    break;

                case blackPieces[3]://Horse
                    let horse = blackHorseMoves(matriz, row, col);
                    for (let index = 0; index < horse.length; index++) {
                        possibleMovementsBlack.push(horse[index]);
                    }
                    break;

                case blackPieces[4]://Queen
                    let queen = blackQueenMoves(matriz, row, col);
                    for (let index = 0; index < queen.length; index++) {
                        possibleMovementsBlack.push(queen[index]);
                    }
                    break;

                case blackPieces[5]://King
                    let king = blackKingMoves(matriz, row, col);
                    for (let index = 0; index < king.length; index++) {
                        possibleMovementsBlack.push(king[index]);
                    }
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

    // console.log(possibleMovementsBlack[index])

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
    
        let possibleBlackHoseMovements = [];
    
        //sin dudas la parte de codigo mas fea del programa, pero no se como hacerlo de otra manera
    
        if (row < 14 && col < 15){
            //come en ese lugar
            if (whitePieces.includes(matriz[row+2][col+1])){
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row+2][col+1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col+1
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row+2][col+1] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+2, col+1), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row+1][col+2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row+1,
                        to_col: col+2
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row+1][col+2] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+1, col+2), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row-2][col+1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row-2,
                        to_col: col+1
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row-2][col+1] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-2, col+1), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row-1][col+2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row-1,
                        to_col: col+2
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row-1][col+2] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-1, col+2), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row-1][col-2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row-1,
                        to_col: col-2
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row-1][col-2] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value:( valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-1, col-2), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row-2][col-1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row-2,
                        to_col: col-1
                    }
                )
            }
    
            //se mueve a ese lugar
            else if(matriz[row-2][col-1] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row-2, col-1), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row+1][col-2]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+1, col-2), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row+1,
                        to_col: col-2
                    }
                )
            }
        
            //se mueve a ese lugar
            else if(matriz[row+1][col-2] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+1, col-2), iterLevel-1).value),
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
                possibleBlackHoseMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row+2][col-1]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col-1
                    }
                )
            }
        
            //se mueve a ese lugar
            else if(matriz[row+2][col-1] == ' '){
                possibleBlackHoseMovements.push(
                    {
                        value: (valuePieces.Horse - moveWhite( movePiece(matriz, row, col, row+2, col-1), iterLevel-1).value),
                        from_row: row,
                        from_col: col,
                        to_row: row+2,
                        to_col: col-1
                    }
                )
            }
        }
    
        return possibleBlackHoseMovements;
    }
    
    function blackKingMoves(matriz, row, col){
    
        let possibleBlackKingMovements = [];
    
        for(let i = row - 1; 0 < i && i <= row + 1 && i < 16; i++){
            for(let j = col - 1; 0 < j && j <= col + 1 && j < 16; j++){
    
                //que no analice la misma posicion adonde esta
                if(j == col && i == row){
                    continue;
                }
    
                //si hay una negra adelante, la come
                if(whitePieces.includes(matriz[i][j])){
                    possibleBlackKingMovements.push(
                        {
                            value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
                            from_row: row,
                            from_col: col,
                            to_row: i,
                            to_col: j
                        }
                    )
                }
    
                //si no hay nada adelante, se mueve ahi
                else if(matriz[i][j] == ' '){
                    possibleBlackKingMovements.push(
                        {
                            value:( valuePieces.King - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
                            from_row: row,
                            from_col: col,
                            to_row: i,
                            to_col: j
                        }
                    )
                }
            }
        }
    
        return possibleBlackKingMovements;
    }
    
    function blackRookMoves(matriz, row, col){
    
        let possibleBlackRookMovements = [];
        //* busca la primera pieza que encuentra adelante
        for (let i = row + 1 ; i < 16; i++){
    
            // si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleBlackRookMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, col), iterLevel-1).value),
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
                    possibleBlackRookMovements.push(
                        {
                            value: (valuePieces.Rook - moveWhite( movePiece(matriz, row, col, i-1, col), iterLevel-1).value),
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
                possibleBlackRookMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, col), iterLevel-1).value),
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
                    possibleBlackRookMovements.push(
                        {
                            value: (valuePieces.Rook - moveWhite( movePiece(matriz, row, col, i+1, col), iterLevel-1).value),
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
                possibleBlackRookMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row, j), iterLevel-1).value),
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
                    possibleBlackRookMovements.push(
                        {
                            value: (valuePieces.Rook - moveWhite( movePiece(matriz, row, col, row, j+1), iterLevel-1).value),
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
                possibleBlackRookMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, row, j), iterLevel-1).value),
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
                    possibleBlackRookMovements.push(
                        {
                            value: (valuePieces.Rook - moveWhite( movePiece(matriz, row, col, row, j-1)).value),
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
    
        return possibleBlackRookMovements;
    }
    
    function blackBishopMoves(matriz, row, col){
    
        let possibleBlackBishopMovements = []
    
        //* busca la primera pieza en diagonal inferior derecha
        loop:
        for (let i = row-1, j = col -1 ; i > 0 && j > 0; i--, j--){
    
            //si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][j])){
                possibleBlackBishopMovements.push(
                    {
                        value: (valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackBishopMovements.push(
                        {
                            value: (valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i+1, j+1), iterLevel-1).value),
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
                possibleBlackBishopMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackBishopMovements.push(
                        {
                            value: (valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value),
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
                possibleBlackBishopMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackBishopMovements.push(
                        {
                            value: (valuePieces.Bishop - moveWhite(movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value),
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
                possibleBlackBishopMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackBishopMovements.push(
                        {
                            value:( valuePieces.Bishop - moveWhite( movePiece(matriz, row, col, i-1, j-1), iterLevel-1).value),
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
    
        return possibleBlackBishopMovements;
    }
    
    function blackQueenMoves(matriz, row, col){
    
        let possibleBlackQueenMovements = [];
    
        //* busca la primera pieza que encuentra adelante
        for (let i = row + 1 ; i < 16; i++){
    
            // si encuentra una blanca, la come
            if(whitePieces.includes(matriz[i][col])){
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating) 
                            - moveWhite(movePiece(matriz, row, col, i, col), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i-1, col), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][col]]]) * weightPieces.eating)  - moveWhite(movePiece(matriz, row, col, i, col),iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, col),iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, row, j+1), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[row][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, row, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, row, j-1), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (valuePieces[letterToName[matriz[i][j]]] * weightPieces.eating - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, j+1), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i+1, j-1), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite(movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite(movePiece(matriz, row, col, i-1, j+1), iterLevel-1).value),
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
                possibleBlackQueenMovements.push(
                    {
                        value: (((valuePieces[letterToName[matriz[i][j]]]) * weightPieces.eating) - moveWhite( movePiece(matriz, row, col, i, j), iterLevel-1).value),
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
                    possibleBlackQueenMovements.push(
                        {
                            value: (valuePieces.Queen - moveWhite( movePiece(matriz, row, col, i-1, j-1), iterLevel-1).value),
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
        return possibleBlackQueenMovements;
    }
    
    function blackPawnMoves(matriz, row, col){
    
        let possibleBlackPawnMovements = [];
    
        //si todavia no se mueve y no tiene nada en las dos filas de adelante, que se mueva 2 filas
        if((row == 3) && matriz[row+1][col] == ' ' && matriz[row+2][col] == ' ' ){
            let matrizBlanca = movePiece(matriz, row, col, row+2, col);
            possibleBlackPawnMovements.push(
                {
                    value: (((valuePieces.Pawn) * weightPieces.firstRowPawn) - moveWhite( matrizBlanca, iterLevel-1).value),
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
            possibleBlackPawnMovements.push(
                {
                    value: (((valuePieces.Pawn) * weightPieces.secondRowPawn) - moveWhite( matrizBlanca , iterLevel-1).value),
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
            possibleBlackPawnMovements.push(
                {
                value:(((valuePieces[letterToName[matriz[row+1][col+1]]]) * weightPieces.eating) - moveWhite( matrizBlanca, iterLevel-1).value),
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
            possibleBlackPawnMovements.push(
                {
                    value: (((valuePieces[letterToName[matriz[row+1][col-1]]]) * weightPieces.eating) - moveWhite( matrizBlanca, iterLevel-1).value),
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
            possibleBlackPawnMovements.push(
                {
                    //entre mas cerca este de convertirse en reina (fila 8), mas alto el puntaje
                    value: (((valuePieces.Pawn) * weightPieces.movingFowardPawn - ((7-row-1) * 10)) - moveWhite( matrizBlanca, iterLevel-1).value),
                    from_row: row,
                    from_col: col,
                    to_row: (row+1),
                    to_col: col
                }
            )
        }
        return possibleBlackPawnMovements;
    }
}

module.exports = {
    moveBlack : moveBlack,
    moveWhite : moveWhite,
}