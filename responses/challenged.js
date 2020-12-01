exports.challenged = (board_id) => {
    if(board_id.length === 36){
        return JSON.stringify(
            {
                action: 'accept_challenge',
                data: {
                    board_id : board_id
                }
            }
        )
    }
    else{
        throw new Error('board_id invalido')
    }
}