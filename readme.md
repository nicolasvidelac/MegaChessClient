[![Coverage Status](https://coveralls.io/repos/github/nicolasvidelac/MegaChessClient/badge.svg?branch=beta)](https://coveralls.io/github/nicolasvidelac/MegaChessClient?branch=beta)
[![Build Status](https://travis-ci.com/nicolasvidelac/MegaChessClient.svg?branch=beta)](https://travis-ci.com/nicolasvidelac/MegaChessClient)

## About:
This proyect consist on a bot, using web sockets, capable of playing a very unconventional chess, with a 16 x 16 board, and 64 pieces per color.

### Status: Beta
This bot is currently under development and is not 100% stable (and probably will never be).

To start the bot simply use:
```
npm start
```

### Languages and Tools:
<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
<img align="left" alt="WebSocket" width="26px" src="https://sub1.kevinchisholm.com/blog/images/smart-websocket-client-icon.png" />
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" /> 
<br>
</br>
## Rules:
The pieces are the same as in regular chess, but there are more of them, for every piece in regular chess, there are 4 here. So 4 queens, 4 kings, 8 rooks, etc.
Each piece has an assigned value:
  * Queen: 5.
  * Pawn: 10.
  * Horse: 30.
  * Bishop: 40.
  * Rook: 60.
  * King: 100.

When you move certain piece, you score the piece value, and when you capture a piece, you score 10 times the value of the captured piece.

### How to win:
* There is no check or checkmate.
* After 200 moves, the game ends.
* The game is over when one player captures all rival pieces.
* Wins who get the most points.

## How the bot plays
<img align="center" src="https://user-images.githubusercontent.com/51339020/100809785-b1fc6d80-3415-11eb-833a-7651e7e32c47.png" />

The bot interacts with a server, responsible for controlling the game.

When its the bots turn to play, it sends a message like this:
```
{
    "event":"your_turn",
    "data":{
           "board_id":"2d348323-2e79-4961-ac36-1b000e8c42a5",
           "turn_token":"e40573bb-138f-4171-a200-66258f546755",
           "username":"username",
           "actual_turn":"white",
           "board":"rrhhbbqqkkbbhhrrrrhhbbqqkkbbhhrrpppppppppppppppppppppppppppppppp                                                                                                                        P       PPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPRRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR",
           "move_left":19, 
           "opponent_username”: “maria”
           }
}
```
After, it decides what move to make, and sends a message like: 
```
{
    “action”: 'move', 
    “data”: {
            “board_id”: ”2d348323-2e79-4961-ac36-1b000e8c42a5”,
            “turn_token: ”e40573bb-138f-4171-a200-66258f546755”,
            “from_row”: 1,
            “from_col”: 1,
            “to_row”: 3,
            “to_col”: 1
        }
}
```
