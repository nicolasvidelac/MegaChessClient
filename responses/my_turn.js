const { moveBlack, moveWhite } = require('../algorithm/move');
const { myUsername } = require('../enums/myUsername');
const { makeMatriz } = require('../utilities/makeMatriz');

exports.my_turn = (data) => {
    let result;

    if (data.username != myUsername){
        console.log(data)
        throw new Error('different username')
    }

    switch (data.actual_turn) {
        
        case 'black':
            console.log("turno black")
            result = moveBlack(makeMatriz(data.board))
            // console.log('enviado')
            return JSON.stringify({
                action: 'move',
                data: {
                    board_id: data.board_id,
                    turn_token: data.turn_token,
                    from_row: result.from_row,
                    from_col: result.from_col,
                    to_row: result.to_row,
                    to_col: result.to_col,
                }
            })
        
        case 'white':
            console.log("turno white")
            result = moveWhite(makeMatriz(data.board))
            // console.log('enviado')
            return JSON.stringify({
                action: 'move',
                data: {
                    board_id: data.board_id,
                    turn_token: data.turn_token,
                    from_row: result.from_row,
                    from_col: result.from_col,
                    to_row: result.to_row,
                    to_col: result.to_col,
                }
            })

        default:
            throw new Error('actual_turn invalid')
    }
}