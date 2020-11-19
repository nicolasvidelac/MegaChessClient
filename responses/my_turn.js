var Black = require('../algorithm/Black');
var White = require('../algorithm/White');

function move(ws, data){

    if(data.actual_turn == 'black'){
        ws.send(Black.moveBlack(data))
    }

    else if(data.actual_turn == 'white'){
        ws.send(White.moveWhite(data))
    }
    else {
        console.log("no funciona una chota")
    }
}

module.exports.move = move;