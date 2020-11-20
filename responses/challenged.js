function challenged(ws, data){
        ws.send(JSON.stringify({
            action: 'accept_challenge',
            data: {
                board_id : data.board_id
            }
        }))
}

module.exports.challenged = challenged;