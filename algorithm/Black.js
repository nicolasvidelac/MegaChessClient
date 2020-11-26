const { moveWhite } = require("./move");
const { blackPieces, whitePieces } = require("../enums/pieces");
const { letterToName } = require('../enums/letterToName');
const { valuePieces } = require("../enums/valuePieces");
const { movePiece } = require("../extras/movePiece");
const { weightPieces } = require("../enums/weightPieces");

//nivel de profundidad del bucle de minimax
let iterLevel;
