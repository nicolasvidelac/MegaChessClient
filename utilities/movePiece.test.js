const { movePiece } = require("./movePiece");

test('should return a matrix with piece moved', () => {
  let matriz = [
      [
        ' ', 'r', 'h', ' ',
        'b', 'b', ' ', ' ',
        'k', 'k', 'b', 'b',
        'h', 'h', 'r', 'r'
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        'q', 'k', 'b', 'b',
        'h', 'h', 'r', 'r'
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', 'p', 'p', 'p',
        'p', 'p', 'p', 'p'
      ],
      [
        ' ', ' ', 'h', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        'R', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'Q', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'P', 'P', 'P', 'P',
        ' ', ' ', ' ', 'P',
        'P', 'P', 'P', 'P'
      ],
      [
        ' ', ' ', 'H', 'H',
        ' ', 'B', ' ', ' ',
        ' ', ' ', 'B', 'B',
        'H', 'H', 'R', 'R'
      ],
      [
        ' ', ' ', ' ', 'B',
        'B', 'B', ' ', ' ',
        ' ', 'K', 'B', 'B',
        'H', 'H', 'R', 'R'
      ]
  ];
  let func = movePiece(matriz, 1,8,2,8)
  let result = [
    [
      ' ', 'r', 'h', ' ',
      'b', 'b', ' ', ' ',
      'k', 'k', 'b', 'b',
      'h', 'h', 'r', 'r'
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', 'k', 'b', 'b',
      'h', 'h', 'r', 'r'
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      'q', 'p', 'p', 'p',
      'p', 'p', 'p', 'p'
    ],
    [
      ' ', ' ', 'h', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      'R', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      'Q', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      'P', 'P', 'P', 'P',
      ' ', ' ', ' ', 'P',
      'P', 'P', 'P', 'P'
    ],
    [
      ' ', ' ', 'H', 'H',
      ' ', 'B', ' ', ' ',
      ' ', ' ', 'B', 'B',
      'H', 'H', 'R', 'R'
    ],
    [
      ' ', ' ', ' ', 'B',
      'B', 'B', ' ', ' ',
      ' ', 'K', 'B', 'B',
      'H', 'H', 'R', 'R'
    ]
  ]
  
  expect(func).toStrictEqual(result)
})

test('should return a matrix with piece moved', () => {
  let matriz =
  [
    [
      ' ', ' ', 'h', ' ',
      ' ', ' ', ' ', ' ',
      'k', 'k', ' ', ' ',
      'h', 'h', 'r', 'r'
    ],
    [
      ' ', ' ', 'h', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', 'b', 'b',
      'h', 'h', 'r', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', 'p',
      'p', 'p', 'p', 'r'
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', 'p', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', 'b', ' ', ' ',
      ' ', 'p', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      'r', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', 'B',
      ' ', ' ', ' ', ' '
    ],
    [' ', ' ', ' ', 'P',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ','R', ' ', ' ', ' ',' ', 'K', 'q', ' '],
    [' ', 'R', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', 'P', 'P', 'P'],
    [' ', ' ', 'H', 'H','B', ' ', ' ', ' ',' ', ' ', 'B', ' ','H', 'H', 'R', 'R'],
    [
      ' ', ' ', ' ', 'H',
      'B', 'B', ' ', ' ',
      'K', 'K', 'B', 'B',
      'H', 'H', 'R', 'R'
    ]
  ]
  let func = movePiece(matriz, 12, 13, 12, 14)
  let result =
  [
    [
      ' ', ' ', 'h', ' ',
      ' ', ' ', ' ', ' ',
      'k', 'k', ' ', ' ',
      'h', 'h', 'r', 'r'
    ],
    [
      ' ', ' ', 'h', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', 'b', 'b',
      'h', 'h', 'r', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', 'p',
      'p', 'p', 'p', 'r'
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', 'p', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', 'b', ' ', ' ',
      ' ', 'p', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', ' '
    ],
    [
      'r', ' ', ' ', ' ',
      ' ', ' ', ' ', ' ',
      ' ', ' ', ' ', 'B',
      ' ', ' ', ' ', ' '
    ],
    [' ', ' ', ' ', 'P',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ',' ', ' ', ' ', ' ','R', ' ', ' ', ' ',' ', ' ', 'K', ' '],
    [' ', 'R', ' ', ' ',' ', ' ', ' ', ' ',' ', ' ', ' ', ' ',' ', 'P', 'P', 'P'],
    [' ', ' ', 'H', 'H','B', ' ', ' ', ' ',' ', ' ', 'B', ' ','H', 'H', 'R', 'R'],
    [
      ' ', ' ', ' ', 'H',
      'B', 'B', ' ', ' ',
      'K', 'K', 'B', 'B',
      'H', 'H', 'R', 'R'
    ]
  ]
  
  expect(func).toStrictEqual(result)
})


test('should throw error', () => {
  
  //matriz de 14 filas
  let matriz = [
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        'q', 'k', 'b', 'b',
        'h', 'h', 'r', 'r'
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', 'p', 'p', 'p',
        'p', 'p', 'p', 'p'
      ],
      [
        ' ', ' ', 'h', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        'R', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'Q', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'P', 'P', 'P', 'P',
        ' ', ' ', ' ', 'P',
        'P', 'P', 'P', 'P'
      ],
      [
        ' ', ' ', 'H', 'H',
        ' ', 'B', ' ', ' ',
        ' ', ' ', 'B', 'B',
        'H', 'H', 'R', 'R'
      ],
      [
        ' ', ' ', ' ', 'B',
        'B', 'B', ' ', ' ',
        ' ', 'K', 'B', 'B',
        'H', 'H', 'R', 'R'
      ]
  ];
  
  expect(() => {
    movePiece(matriz, 1,8,2,8)
  }).toThrowError('matriz de formato incorrecto');
})

test('should throw error', () => {
  //muevo desde una posicion inexistente

  let matriz = [
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        'q', 'k', 'b', 'b',
        'h', 'h', 'r', 'r'
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', 'p', 'p', 'p',
        'p', 'p', 'p', 'p'
      ],
      [
        ' ', ' ', 'h', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        'R', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'Q', ' ', ' ', ' ',
        ' ', ' ', ' ', ' ',
        ' ', ' ', ' ', ' '
      ],
      [
        ' ', ' ', ' ', ' ',
        'P', 'P', 'P', 'P',
        ' ', ' ', ' ', 'P',
        'P', 'P', 'P', 'P'
      ],
      [
        ' ', ' ', 'H', 'H',
        ' ', 'B', ' ', ' ',
        ' ', ' ', 'B', 'B',
        'H', 'H', 'R', 'R'
      ],
      [
        ' ', ' ', ' ', 'B',
        'B', 'B', ' ', ' ',
        ' ', 'K', 'B', 'B',
        'H', 'H', 'R', 'R'
      ]
  ];
  
  expect(() => {
    movePiece(matriz, 1,15,2,8)
  }).toThrowError('matriz de formato incorrecto');
})

