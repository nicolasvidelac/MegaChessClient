exports.makeMatriz = (board) => {

    let index = 0;
    let matriz = [];

    try {

        for (let i = 0; i < 16; i++){
            
            let row = [];

            for(let j = 0; j<16; j++){
                if (board[index] == undefined){
                    throw new Error;
                }else{
                    row.push(board[index]);
                    index++;
                }
            }

            matriz.push(row)
        }
    } catch (error) {
        console.log(error)
        throw new Error('string board incompleto')
    }
    
    return matriz;
}