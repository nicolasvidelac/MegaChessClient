[![Coverage Status](https://coveralls.io/repos/github/nicolasvidelac/MegaChessClient/badge.svg?branch=beta)](https://coveralls.io/github/nicolasvidelac/MegaChessClient?branch=beta)
[![Build Status](https://travis-ci.com/nicolasvidelac/MegaChessClient.svg?branch=beta)](https://travis-ci.com/nicolasvidelac/MegaChessClient)

## Status: Beta
This bot is currently under development and is not 100% stable (and probably will never be).

To start the bot simply use:
```
npm start
```

### Languages and Tools:
[<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />]
<img align="left" alt="WebSocket" width="26px" src="https://sub1.kevinchisholm.com/blog/images/smart-websocket-client-icon.png" />
<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
<img align="left" alt="Node.js" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />
<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />. 

## About:
This proyect consist on a bot capable of playing a very unconventional chess, with a 16 x 16 board, and 64 pieces per color.

### Rules:
Each pieces has it own value:
  * Queen: 5
  * Pawn: 10
  * Horse: 30
  * Bishop: 40
  * Rook: 60
  * King: 100

When you capture a piece, you score 10 times the value of the captured piece.

### How to win:
* There is no check or checkmate.
* After 200 moves, the game ends.
* The game is over when one color capture all rival pieces or when the amount of movements reaches 0.
* Win who get more points.


