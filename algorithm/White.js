function moveWhite(data) {
    return JSON.stringify({
        action: 'move',
        data: {
            board_id: data.data.board_id,
            turn_token: data.data.turn_token,
            from_row: Math.floor(Math.random() * 15),
            from_col: Math.floor(Math.random() * 15),
            to_row: Math.floor(Math.random() * 15),
            to_col: Math.floor(Math.random() * 15),
        }
    });
}

module.exports.moveWhite = moveWhite;