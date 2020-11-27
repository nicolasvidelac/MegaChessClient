function movePiece(matriz, from_row, from_col, to_row, to_col){
  
    let matrizNueva = new Array();

    // si hago matrizNueva = matriz, se le pasa una referencia,
    // no los valores, con esto arreglo para solo pasar valores.
    for (var i = 0; i < matriz.length; i++) {
    matrizNueva.push(matriz.slice(i,i+1)[0].slice(0))
    }
     
    matrizNueva[to_row][to_col] = matrizNueva[from_row][from_col];
    matrizNueva[from_row][from_col] = ' ';
     
    return matrizNueva;
}

module.exports = {
    movePiece : movePiece
}