// valor extra para cada posicion para cada pieza 
const whitePlaceWeight = {
    horseEval :  [
        [-5.0, -5.0, -4.0, -4.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -5.0, -5.0],
        [-5.0, -5.0, -4.0, -4.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -5.0, -5.0],
        [-4.0, -4.0, -2.0, -2.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -2.0, -2.0, -4.0, -4.0],
        [-4.0, -4.0, -2.0, -2.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -2.0, -2.0, -4.0, -4.0],
        [-3.0, -3.0,  0.0,  0.0,  1.0,  1.0,  1.5,  1.5,  1.5,  1.5,  1.0,  1.0,  0.0,  0.0, -3.0, -3.0],
        [-3.0, -3.0,  0.0,  0.0,  1.0,  1.0,  1.5,  1.5,  1.5,  1.5,  1.0,  1.0,  0.0,  0.0, -3.0, -3.0],
        [-3.0, -3.0,  0.5,  0.5,  1.5,  1.5,  2.0,  2.0,  2.0,  2.0,  1.5,  1.5,  0.5,  0.5, -3.0, -3.0],
        [-3.0, -3.0,  0.5,  0.5,  1.5,  1.5,  2.0,  2.0,  2.0,  2.0,  1.5,  1.5,  0.5,  0.5, -3.0, -3.0],
        [-3.0, -3.0,  0.0,  0.0,  1.5,  1.5,  2.0,  2.0,  2.0,  2.0,  1.5,  1.5,  0.0,  0.0, -3.0, -3.0],
        [-3.0, -3.0,  0.0,  0.0,  1.5,  1.5,  2.0,  2.0,  2.0,  2.0,  1.5,  1.5,  0.0,  0.0, -3.0, -3.0],
        [-3.0, -3.0,  0.5,  0.5,  1.0,  1.0,  1.5,  1.5,  1.5,  1.5,  1.0,  1.0,  0.5,  0.5, -3.0, -3.0],
        [-3.0, -3.0,  0.5,  0.5,  1.0,  1.0,  1.5,  1.5,  1.5,  1.5,  1.0,  1.0,  0.5,  0.5, -3.0, -3.0],
        [-4.0, -4.0, -2.0, -2.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -2.0, -2.0, -4.0, -4.0],
        [-4.0, -4.0, -2.0, -2.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -2.0, -2.0, -4.0, -4.0],
        [-5.0, -5.0, -4.0, -4.0, -3.0,  -3.0,-3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -5.0, -5.0],
        [-5.0, -5.0, -4.0, -4.0, -3.0,  -3.0,-3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -5.0, -5.0],
    ],

    bishopEval : [
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0,  -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0,  -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,   0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,   0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  1.0,  1.0,   1.0,  1.0,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  1.0,  1.0,   1.0,  1.0,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.5,  0.5,  0.5,  0.5,  1.0,  1.0,   1.0,  1.0,  0.5,  0.5,  0.5,  0.5, -1.0, -1.0],
        [ -1.0, -1.0,  0.5,  0.5,  0.5,  0.5,  1.0,  1.0,   1.0,  1.0,  0.5,  0.5,  0.5,  0.5, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  1.0,  1.0,  1.0,  1.0,   1.0,  1.0,  1.0,  1.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  1.0,  1.0,  1.0,  1.0,   1.0,  1.0,  1.0,  1.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,   1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0, -1.0],
        [ -1.0, -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,   1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.5,  0.5,  0.0,  0.0,  0.0,  0.0,   0.0,  0.0,  0.0,  0.0,  0.5,  0.5, -1.0, -1.0],
        [ -1.0, -1.0,  0.5,  0.5,  0.0,  0.0,  0.0,  0.0,   0.0,  0.0,  0.0,  0.0,  0.5,  0.5, -1.0, -1.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0,  -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0,  -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0]
    ],

    rookEval : [
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [ 0.5,  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, 1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5,  0.5],
        [ 0.5,  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, 1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5,  0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [-0.5, -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5, -0.5],
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [ 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    ],
    
    queenEval : [
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -0.5, -0.5, -0.5, -0.5, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -0.5, -0.5, -0.5, -0.5, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -0.5, -0.5,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -0.5, -0.5],
        [ -0.5, -0.5,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -0.5, -0.5],
        [  0.0,  0.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -0.5, -0.5],
        [  0.0,  0.0,  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -0.5, -0.5],
        [ -1.0, -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0, -1.0],
        [ -1.0, -1.0,  0.0,  0.0,  0.5,  0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0, -1.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -0.5, -0.5, -0.5, -0.5, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
        [ -2.0, -2.0, -1.0, -1.0, -1.0, -1.0, -0.5, -0.5, -0.5, -0.5, -1.0, -1.0, -1.0, -1.0, -2.0, -2.0],
    ],

    kingEval : [
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -5.0, -5.0, -5.0, -5.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0],
        [ -2.0, -2.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0, -3.0, -3.0, -2.0, -2.0],
        [ -2.0, -2.0, -3.0, -3.0, -3.0, -3.0, -4.0, -4.0, -4.0, -4.0, -3.0, -3.0, -3.0, -3.0, -2.0, -2.0],
        [ -1.0, -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0, -1.0],
        [ -1.0, -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0, -1.0],
        [  2.0,  2.0,  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0,  2.0,  2.0],
        [  2.0,  2.0,  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0,  2.0,  2.0],
        [  2.0,  2.0,  3.0,  3.0,  1.0,  1.0,  0.0,  0.0,  0.0,  0.0,  1.0,  1.0,  3.0,  3.0,  2.0,  2.0],
        [  2.0,  2.0,  3.0,  3.0,  1.0,  1.0,  0.0,  0.0,  0.0,  0.0,  1.0,  1.0,  3.0,  3.0,  2.0,  2.0]
    ],

    pawnEval : [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        
        [205,  205,  205,  205,  210,  210,  220,  220, 220,  220,  210,  210,  205,  205,  205,  205],
        [170,  170,  170,  170,  180,  180,  190,  190, 190,  190,  180,  180,  170,  170,  170,  170],
        [140,  140,  140,  140,  150,  150,  160,  160, 160,  160,  150,  150,  140,  140,  140,  140],
        [110,  110,  110,  110,  120,  120,  130,  130, 130,  130,  120,  120,  110,  110,  110,  110],

        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, 0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    ],
}

const blackPlaceWeight = {
    horseEval : whitePlaceWeight.horseEval,
    bishopEval: reverseArray(whitePlaceWeight.bishopEval),
    kingEval  : reverseArray(whitePlaceWeight.kingEval),
    queenEval : whitePlaceWeight.queenEval,
    kingEval  : reverseArray(whitePlaceWeight.kingEval),
    rookEval  : reverseArray(whitePlaceWeight.rookEval),
    pawnEval  : reverseArray(whitePlaceWeight.pawnEval)
}

function reverseArray (array) {
    return array.slice().reverse();
};

module.exports = {
    whitePlaceWeight : whitePlaceWeight,
    blackPlaceWeight : blackPlaceWeight
}