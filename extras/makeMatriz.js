function makeMatriz(board){

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

module.exports = {
    makeMatriz : makeMatriz
}