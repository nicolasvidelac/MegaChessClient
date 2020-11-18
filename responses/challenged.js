function challenged(ws, data){
    console.log(data.data.username)
    if(data.data.username == 'nicolasvc'){
        ws.send(JSON.stringify({
            action: 'accept_challenge',
            data: {
                board_id : data.data.board_id
            }
        }))
    }
}

module.exports.challenged = challenged;