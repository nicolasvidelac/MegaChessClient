const { blackPieces } = require("../enums/pieces");
const letterToName = require('../enums/letterToName');
const { valuePieces } = require("../enums/valuePieces");


let possibleMovements = [];

function moveWhite(data) {


    let matriz = matrix(data);
    

    possiblePawnMoves(matriz);


    //busco cual de los resultados es el que tiene el mayor valor.
    let max = 0; 


    possibleMovements.forEach(pm => {
        if (pm.value >= max){
            max = pm.value
        }
    })

    let index = 0;
    index = possibleMovements.findIndex( s => s.value == max);

    let result = JSON.stringify({
        action: 'move',
        data: {
            board_id: data.board_id,
            turn_token: data.turn_token,
            from_row: possibleMovements[index].from_row,
            from_col: possibleMovements[index].from_col,
            to_row: possibleMovements[index].to_row,
            to_col: possibleMovements[index].to_col,
        }
    });

    possibleMovements = [];

    //devuelvo un json con los datos desde y hacia del movimiento de mayor valor
    return result;
}

function possiblePawnMoves(matriz){

    for(let col = 0; col < 16; col++){
        for(let row = 13; row > 7; row--){
            if(matriz[row][col] == 'P'){


                //si todavia no se mueve y no tiene nada en las dos filas de adelante
                if((row == 13 || row == 12) && matriz[row-1][col] == ' ' && matriz[row-2][col] == ' ' ){

                    possibleMovements.push(
                        {
                            value: (valuePieces.Pawn) * 3,
                            from_row: row,
                            from_col: col,
                            to_row: row-2,
                            to_col: col
                        }
                    )
                }
                //si tiene algo a la derecha para comer
                if((blackPieces.includes(matriz[row-1][col+1]))){
                    possibleMovements.push(
                        {
                            value: valuePieces[letterToName[matriz[row-1][col+1]]],
                            from_row: row,
                            from_col: col,
                            to_row: row-1,
                            to_col: col+1
                        }
                    )
                }

                //si tiene algo a la izquierda para comer
                if(blackPieces.includes(matriz[row-1][col-1])){

                    possibleMovements.push(
                        {
                            value: valuePieces[letterToName[matriz[row+1][col-1]]],
                            from_row: row,
                            from_col: col,
                            to_row: row-1,
                            to_col: col-1
                        }
                    )
                }

                //si no tiene nada adelante
                if(blackPieces.includes(matriz[row-1][col] == ' ')){

                    possibleMovements.push(
                        {
                            value: (valuePieces.Pawn),
                            from_row: row,
                            from_col: col,
                            to_row: row-1,
                            to_col: col
                        }
                    )
                }

            }

        }
    }

    

}

function matrix(data){
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