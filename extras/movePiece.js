function movePiece(matriz, from_row, from_col, to_row, to_col){
    matriz[to_row][to_col] = matriz[from_row][from_col];
    matriz[from_row][from_col] = ' ';
    return matriz;
}

module.exports = {
    movePiece : movePiece
}