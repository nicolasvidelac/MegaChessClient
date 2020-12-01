exports.movePiece = (matriz, from_row, from_col, to_row, to_col) => {
   
    let matrizNueva = new Array();

    try {
        // si hago matrizNueva = matriz, se le pasa una referencia,
        // no los valores, con esto arreglo para solo pasar valores.

        for (var i = 0; i < 16; i++) {
        matrizNueva.push(matriz.slice(i,i+1)[0].slice(0))
        }
         
        matrizNueva[to_row][to_col] = matrizNueva[from_row][from_col];
        matrizNueva[from_row][from_col] = ' ';

    } catch (error) {
        throw new Error('matriz de formato incorrecto')
    }
     
    return matrizNueva;
}