function challenged(ws, data){
    if(data.username == 'nicolasvc'){
        ws.send(JSON.stringify({
            action: 'accept_challenge',
            data: {
                board_id : data.board_id
            }
        }))
    }
}

module.exports.challenged = challenged;