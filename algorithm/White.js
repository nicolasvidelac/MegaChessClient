const { moveBlack } = require("./move");
const { blackPieces, whitePieces } = require("../enums/pieces");
const { letterToName } = require('../enums/letterToName');
const { valuePieces } = require("../enums/valuePieces");
const { movePiece } = require("../extras/movePiece");
const { weightPieces } = require("../enums/weightPieces");
const padre = module.parent.exports[0];


//arreglo donde guardo todos los posibles movimientos a hacer esta jugada
let possibleMovementsWhite = [];

//nivel de profundidad del bucle de minimax
let iterLevel;
