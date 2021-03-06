import test from 'tape'
import { deepEqualTests } from './testUtils'
import {
  setRandom,
  createField,
  createRow,
  createColumn,
  createDiagonal,
  createBoard,
  createSerie,
  getDiagonals,
  distribute
} from '../src/utils'

deepEqualTests({
  desc: 'setRandom() should return value in range',
  assertions: [
    {
      actual: setRandom(0)(0, 3),
      expected: 0,
      msg: 'The lowest value (zero) in range'
    },
    {
      actual: setRandom(0)(1, 3),
      expected: 1,
      msg: 'The lowest value in range'
    },
    {
      actual: setRandom(1)(1, 3),
      expected: 3,
      msg: 'The highest value in range'
    },
    {
      actual: setRandom(0.5)(1, 3),
      expected: 2,
      msg: 'The middle value in range'
    }
  ]
})

deepEqualTests({
  desc: 'createField() should return field object with predefined values',
  assertions: [
    {
      actual: createField('_', 0, 0),
      expected: { x: 0, y: 0, mark: '', win: false },
      msg: 'Empty field object.'
    },
    {
      actual: createField('O', 0, 1),
      expected: { x: 0, y: 1, mark: 'O', win: false },
      msg: 'Field object of player 1 with "O" mark.'
    },
    {
      actual: createField('X', 1, 0),
      expected: { x: 1, y: 0, mark: 'X', win: false },
      msg: 'Field object of player 2 with "X" mark.'
    }
  ]
})

deepEqualTests({
  desc: 'createRow() should return row serie with predefined fields',
  assertions: [
    {
      actual: createRow(['_', 'X', 'O'], 2),
      expected: [
        { x: 0, y: 2, mark: '', win: false },
        { x: 1, y: 2, mark: 'X', win: false },
        { x: 2, y: 2, mark: 'O', win: false }
      ],
      msg: 'Last row with various fields: [_, X, O].'
    }
  ]
})

deepEqualTests({
  desc: 'createColumn() should return column serie with predefined fields',
  assertions: [
    {
      actual: createColumn(['_', 'X', 'O'], 2),
      expected: [
        { x: 2, y: 0, mark: '', win: false },
        { x: 2, y: 1, mark: 'X', win: false },
        { x: 2, y: 2, mark: 'O', win: false }
      ],
      msg: 'Last column with various fields: [_, X, O].'
    }
  ]
})

deepEqualTests({
  desc: 'createDiagonal() should return diagonal serie with predefined fields',
  assertions: [
    {
      actual: createDiagonal(['_', 'X', 'O'], 'topRight'),
      expected: [
        { x: 2, y: 0, mark: '', win: false },
        { x: 1, y: 1, mark: 'X', win: false },
        { x: 0, y: 2, mark: 'O', win: false }
      ],
      msg: 'Diagonal serie from top-right corner to bottom-left corner with various fields: [_, X, O].'
    },
    {
      actual: createDiagonal(['_', 'X', 'O'], 'topLeft'),
      expected: [
        { x: 0, y: 0, mark: '', win: false },
        { x: 1, y: 1, mark: 'X', win: false },
        { x: 2, y: 2, mark: 'O', win: false }
      ],
      msg: 'Diagonal serie from top-left corner to bottom-right corner with various fields: [_, X, O].'
    }
  ]
})

deepEqualTests({
  desc: 'createBoard() should return array with rows which contain field objects with predefined properties',
  assertions: [
    {
      actual: createBoard([
        ['_', 'X', 'O'],
        ['_', '_', 'O'],
        ['_', 'X', '_']
      ]),
      expected: [
        createRow(['_', 'X', 'O'], 0),
        createRow(['_', '_', 'O'], 1),
        createRow(['_', 'X', '_'], 2)
      ],
      msg: 'Board with various fields.'
    }
  ]
})

deepEqualTests({
  desc: 'createSerie() should return array with field objects',
  assertions: [
    {
      actual: createSerie([[0, 0, 'X'], [1, 1, 'X'], [2, 2, 'O']]),
      expected: [
        createField('X', 0, 0),
        createField('X', 1, 1),
        createField('O', 2, 2)
      ],
      msg: 'Diagonal from top-left corner to bottom-right corner'
    },
    {
      actual: createSerie([[2, 0, 'X'], [1, 1, 'X'], [0, 2, 'O']]),
      expected: [
        createField('X', 2, 0),
        createField('X', 1, 1),
        createField('O', 0, 2)
      ],
      msg: 'Diagonal from top-right corner to bottom-left corner'
    }
  ]
})

test('getDiagonals() should return two arrays of diagonal series', assert => {
  const board = createBoard([
    ['_', 'X', 'O'],
    ['_', '_', 'O'],
    ['_', 'X', '_']
  ])
  assert.deepEqual(
    getDiagonals(board),
    [
      createDiagonal(['_', '_', '_'], 'topLeft'),
      createDiagonal(['O', '_', '_'], 'topRight')
    ],
    'Array of two diagonals'
  )
  assert.end()
})

deepEqualTests({
  desc: 'distribute() should return inserted object with changed values (array) in key of multiple same child objects (in array)',
  assertions: [
    {
      actual: distribute({
        key: 'boo',
        values: ['player 1', 'player 2'],
        course: ['foo', 'bar'],
        parent: {
          baz: 'something',
          foo: {
            bar: [
              { boo: '', bum: 'how' },
              { boo: '', bum: 'wow' }
            ]
          }
        }
      }),
      expected: {
        baz: 'something',
        foo: {
          bar: [
            { boo: 'player 1', bum: 'how' },
            { boo: 'player 2', bum: 'wow' }
          ]
        }
      },
      msg: 'Change of primitive values'
    }
  ]
})
