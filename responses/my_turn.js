var moveBlack = require('../algorithm/Black').moveBlack;
var moveWhite = require('../algorithm/White').moveWhite;

function move(data){

    if(data.actual_turn == 'black'){
        //ws.send(Black.moveBlack(data))
        
        let result = moveBlack(data.board)
        
        return (JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: result.from_row,
                from_col: result.from_col,
                to_row: result.to_row,
                to_col: result.to_col,
            }
        }))

    }

    else if(data.actual_turn == 'white'){
        // ws.send(moveWhite(data))

        let result = moveWhite(data.board)

        return (JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: result.from_row,
                from_col: result.from_col,
                to_row: result.to_row,
                to_col: result.to_col,
            }
        }))
    }
}

module.exports.move = move;