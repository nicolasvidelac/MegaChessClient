const { my_turn } = require("../responses/my_turn")

test( 'should return json', () => {
    let data = {
        "board_id":"2d348323-2e79-4961-ac36-1b000e8c42a5",
        "turn_token":"e40573bb-138f-4171-a200-66258f546755",
        "username":"nicolasvc",
        "actual_turn":"white",
        "board":"rrhhbbqqkkbbhhrrrrhhbbqqkkbbhhrrpppppppppppppppppppppppppppppppp                                                                                                                        P       PPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPRRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR",
        "move_left":19,
    }
    
    expect(my_turn(data)).toStrictEqual(
        JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: 12,
                from_col: 6,
                to_row: 10,
                to_col: 6,
            }
        })
    )
})

test( 'should return json', () => {
    let data = {
        "board_id":"2d348356-2e79-4961-ac36-1b111e8c42a5",
        "turn_token":"a70573bb-138f-4171-a200-66258f546755",
        "username":"nicolasvc",
        "actual_turn":"black",
        "board":"rrhhbbqqkkbbhhrrrrhhbbqqkkbbhhrrpppppppppppppppppppppppppppppppp                                                                                                                        P       PPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPRRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR",
        "move_left":19,
    }
    
    expect(my_turn(data)).toStrictEqual(
        JSON.stringify({
            action: 'move',
            data: {
                board_id: data.board_id,
                turn_token: data.turn_token,
                from_row: 3,
                from_col: 6,
                to_row: 5,
                to_col: 6,
            }
        })
    )
})

test( 'should throw username error', () => {
    let data = {
        "board_id":" ",
        "turn_token":" ",
        "username":"gabriel",
        "actual_turn":"white",
        "board":" ",
        "move_left":19,
    }
    
    expect(() => {
        my_turn(data)
    }).toThrowError('different username');
})

test( 'should throw actual_turn error', () => {
    let data = {
        "board_id":" ",
        "turn_token":" ",
        "username":"nicolasvc",
        "actual_turn":" ",
        "board":" ",
        "move_left":19,
    }
    
    expect(() => {
        my_turn(data)
    }).toThrowError('actual_turn invalid');
})
