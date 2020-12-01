[![Coverage Status](https://coveralls.io/repos/github/nicolasvidelac/MegaChessClient/badge.svg?branch=beta)](https://coveralls.io/github/nicolasvidelac/MegaChessClient?branch=beta)
[![Build Status](https://travis-ci.com/nicolasvidelac/MegaChessClient.svg?branch=beta)](https://travis-ci.com/nicolasvidelac/MegaChessClient)

Megachess
This is a challenge for EDA Talen Show, EventBrite. The task is to build an AI which can play Megachess.

About me
I'm Ignacio Brizuela Electronic Engineer and also a programmer. I've been programming for a couple of years as a self-oriented person, now I'm ready to take a challenge that lead me to another level.

Tools
This challenge requires websockets and I chossed Python 3 to solve it.

Websockets.
Python 3.
Rules
The rules are the same as a in a regular chess, except that instead of crown a pawn in the opposite side of the board, pawns crown in the middle squares.

The board is 16x16 squares. So, now there are the quadruple of pieces.

board

There is no check or checkmate.

There are 100 moves for color, 200 in total.

The game is over when one color capture all rival pieces or when the amount of movements reaches 0.

Win who get more points.

Piece points
Queen: 5

Horse: 30

Bishop: 40

Rook: 60

Pawn: 70

King: 100

If there is a capture, the player scores 10 times the piece value captured.

Program structure
This project is made by three parts. There is a Server which controls user accounts, matches, tournaments, etc. and the way it does it is sending and attending json requests.

program_flow

Our task it's to comunicate with the Server and play megachess matches. In order to do that, it is necessary to create an asyncronous client. When a challenge is accepted the client interact with the bot player to plan moves and then send a json request to make the move.

From json to play
The json request that the Server sends when is my turn to play is like:

{
    "event":"your_turn",
    "data":{
    "board_id":"2d348323-2e79-4961-ac36-1b000e8c42a5",
    "turn_token":"e40573bb-138f-4171-a200-66258f546755",
    "username":"your_username",
    "actual_turn":"white",
    "board":"rrhhbbqqkkbbhhrrrrhhbbqqkkbbhhrrpppppppppppppppppppppppppppppppp                                                                                                                        P       PPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPRRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR",
    "move_left":19, 
    "opponent_username”: “rival_username”
}
}
As it's shown, the board it's a string and also it is indicated what color of pieces I am. Therefore, my solution was to create classes to manipulate this data.

classes - Copy

Board
This class transforms the board string into a matrix. This makes easier to locate each piece from the board.

Board string
"rrhhbbqqkkbbhhrrrrhhbbqqkkbbhhrrpppppppppppppppppppppppppppppppp                                                                                                                        P       PPPPPPPP PPPPPPPPPPPPPPPPPPPPPPPRRHHBBQQKKBBHHRRRRHHBBQQKKBBHHRR"
Board matrix
[['r' 'r' 'h' 'h' 'b' 'b' 'q' 'q' 'k' 'k' 'b' 'b' 'h' 'h' 'r' 'r']
 ['r' 'r' 'h' 'h' 'b' 'b' 'q' 'q' 'k' 'k' 'b' 'b' 'h' 'h' 'r' 'r']
 ['p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p']
 ['p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p' 'p']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 [' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ' ']
 ['P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P']
 ['P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P' 'P']
 ['R' 'R' 'H' 'H' 'B' 'B' 'Q' 'Q' 'K' 'K' 'B' 'B' 'H' 'H' 'R' 'R']
 ['R' 'R' 'H' 'H' 'B' 'B' 'Q' 'Q' 'K' 'K' 'B' 'B' 'H' 'H' 'R' 'R']]
Also this class has a method get_pieces_from_board to list all pieces in the board and make them as attributes of the class. So, if we create a board object we will have access to the matrix board and all pieces availables to play.

Pieces
There is a father class with all attributes in common: color, row, col. The color piece and its position. Then there are children classes which inherite from Pieces and they are: Pawn, Horse, Bishop, Rook, Queen, King. These classes add a method to validate their movements: jump and capture.

E.g: To create a black pawn it is necessary to instance a new Pawn object like this:

black_pawn = Pawn('black', 3, 0)
This is a black pawn at row 3, col 0.

We use this line to ask for a capture:

black_pawn.valid_move_capture(rival_row, rival_col)
This function checks if it is a valid move for that kind of pawn (color) and returns True, otherwise False.

Also, there is another function to make a pawn jumps:

black_pawn.make_a_jump()
This function checks the position of the pawn and returns the number of squares that it can jump. In the e.g. before the pawn is in the row 3 so it can jump 2 squares, so the function returns 2 as consequence.

Author ✒️
⌨️nicolasvidelac
