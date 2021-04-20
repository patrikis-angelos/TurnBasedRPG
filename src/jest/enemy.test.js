import Enemy from '../Objects/enemy';
import MockScene from './sceneMock';

let testEnemy;
let scene = MockScene();
let testMap = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
beforeAll(() => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1){
      testMap[i][j] = {index: -1, occupied: false};
    }
  }
  testEnemy = Enemy('spider', 100, 5, 2, testMap)
  testEnemy.instantiate(8, 8, scene);
});

describe('randomMove', () => {
  it('returns a random possible move for the enemy', () => {
    let move = testEnemy.randomMove();
    let possibleMoves = [[0, 1], [1, 0]];
    let contains = false;
    possibleMoves.forEach((possible) => {
      if (possible[0] === move[0] && possible[1] === move[1]){
        contains = true;
      }
    })
    expect(contains).toBe(true);
  });
  it ('return false if there are no pissible moves', () => {
    let enemy2 = Enemy('spider', 100, 5, 2, testMap)
    enemy2.instantiate(24, 8, scene);
    let enemy3 = Enemy('spider', 100, 5, 2, testMap)
    enemy3.instantiate(8, 24, scene);
    let move = testEnemy.randomMove();
    expect(move).toBe(false);
  })
});