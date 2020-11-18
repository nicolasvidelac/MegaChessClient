var Black = require('../algorithm/Black');
var White = require('../algorithm/White');

function move(ws, data){
    if(data.data.actual_turn == 'black'){
        ws.send(Black.moveBlack(data))
    }

    else {
        ws.send(White.moveWhite(data))
    }
}

module.exports.move = move;