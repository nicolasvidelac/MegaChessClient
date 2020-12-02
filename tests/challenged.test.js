const { challenged } = require("../responses/challenged");

test('should return json', () => {
    expect(challenged('2d3422223-2e79-49a61-3436-1b000e13a5'))
    .toStrictEqual(JSON.stringify(
        {
            action: 'accept_challenge',
            data: {
                board_id : '2d3422223-2e79-49a61-3436-1b000e13a5'
            }
        }
    ))

    expect(challenged('13348323-2e79-4961-ac36-1b000e8c42a5'))
    .toStrictEqual(JSON.stringify(
        {
            action: 'accept_challenge',
            data: {
                board_id : '13348323-2e79-4961-ac36-1b000e8c42a5'
            }
        }
    ))
});

test('should throw error', () => {
    expect(() => {
        challenged('15')
    }).toThrowError();
})

