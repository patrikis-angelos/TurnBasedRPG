import Player from '../Objects/player';
import MockScene from './sceneMock';

let scene;
let player;
let testMap = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
let keys;
beforeAll(() => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1){
      testMap[i][j] = {index: -1, occupied: false};
    }
  }
  scene = MockScene();
  player = Player('warrior', 100, 5, 2, testMap);
  player.instantiate(24, 24, scene);
  keys = {
    up: {
      isDown: false
    },
    down: {
      isDown: false
    },
    left: {
      isDown: false
    },
    right: {
      isDown: false
    }
  }
});

describe('checkSurroundings', () => {
  it('checks all adjacent tiles for enemies and returns false if none found', () => {
    const target = player.checkSurroundings();
    expect(target).toBe(false);
  });
  it('checks all adjacent tiles for enemies and returns their position', () => {
    const enemy = Player('warrior', 100, 5, 2, testMap);
    enemy.instantiate(8, 8, scene);
    const target = player.checkSurroundings();
    expect(target).toStrictEqual([0, 0]);
  });
});

describe('move', () => {
  it('moves the player based on the corresponding key', () => {
    keys.down.isDown = true;
    player.move(keys);
    let sprite = player.getInstance();
    //Current position 24px + 16px
    expect(sprite.y).toBe(40);
  });
  it('returns if the movement cooldown is less than the limit', () => {
    keys.down.isDown = false;
    keys.up.isDown = true;
    player.move(keys);
    let sprite = player.getInstance();
    //Current position 40px
    expect(sprite.y).toBe(40);
  })
});