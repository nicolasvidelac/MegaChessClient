const { moveBlack, moveWhite } = require('../algorithm/move');

const makeMatriz = require('../utilities/makeMatriz').makeMatriz;

function my_turn(data){
    let result;
    let depth = 3;

    switch (data.actual_turn) {
        
        case 'black':
            console.log("turno black")
            result = moveBlack(makeMatriz(data.board), depth)
        
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
            result = moveWhite(makeMatriz(data.board), depth)

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
            break;
    }
}

module.exports.my_turn = my_turn;