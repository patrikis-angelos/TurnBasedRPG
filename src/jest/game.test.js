import MockScene from './sceneMock';
import game from '../Modules/game';
import Player from '../Objects/player';

const scene = MockScene();
const testMap = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let coin;

const resetScene = () => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      testMap[i][j] = { index: -1, occupied: false };
    }
  }
  scene.map = testMap;
  scene.enemies = [];
  scene.player = Player('warrior', 100, 5, 2, scene.map);
  coin = {
    x: 8,
    y: 8,
  };
};

beforeAll(() => {
  resetScene();
});

describe('createSpider', () => {
  it('creates a spider at the given location', () => {
    const spider = game.createSpider(8, 8, 10, 2, 1, scene);
    const sprite = spider.getInstance();
    expect(sprite.x).toBe(8);
    expect(sprite.y).toBe(8);
    expect(spider.getActive()).toBe(true);
  });
});

describe('createPlayer', () => {
  it('creates a player at the starting position', () => {
    const player = game.createPlayer(24, 8, 100, 10, 2, scene);
    const sprite = player.getInstance();
    expect(sprite.x).toBe(24);
    expect(sprite.y).toBe(8);
    expect(player.getActive()).toBe(true);
  });
});

describe('pickRandomLocation', () => {
  it('returns a random valid location from the map', () => {
    const location = game.pickRandomLocation(scene);
    // convert pixles to grid based index
    const x = location.y / 16 - 0.5;
    const y = location.x / 16 - 0.5;
    expect(scene.map[y][x].index).toBe(-1);
  });
});

describe('collectCoin', () => {
  it('transoptrs the coin to a random location when the player collect it', () => {
    game.collectCoin(coin, scene);
    expect([8, 24, 40]).toContain(coin.x);
    expect([8, 24, 40]).toContain(coin.y);
  });
  it('never transports the coin to a tile with an obstance', () => {
    scene.map[2][2].index = 10;
    game.collectCoin(coin, scene);
    expect([coin.y, coin.x]).not.toBe([40, 40]);
  });
  it('increases the players score when the coin is collected', () => {
    const score1 = scene.player.getScore();
    game.collectCoin(coin, scene);
    const score2 = scene.player.getScore();
    expect(score2).toBe(score1 + 1);
  });
});

describe('getEnemy', () => {
  it('return the enemy in the given position', () => {
    resetScene();
    game.createSpider(8, 8, 1, 2, 1, scene);
    const enemy = game.getEnemy([0, 0], scene);
    expect(enemy).not.toBe(false);
  });
  it('return false if there is no enemy at the given position', () => {
    const enemy = game.getEnemy([2, 2], scene);
    expect(enemy).toBe(false);
  });
});

describe('startBattle', () => {
  it('does a single attack from attacker to defender and return false if the defender died', () => {
    // player attack:10, enemy health:1 + 2 defence
    const enemy = game.createSpider(40, 40, 1, 2, 1, scene);
    const player = game.createPlayer(24, 40, 100, 10, 2, scene);
    const battle = game.startBattle(player, enemy, [2, 2], scene);
    expect(battle).toBe(false);
  });
  it('return the battle position if the defender is still alive', () => {
    // player attack:10, enemy health:10 + 2 defence
    const enemy = game.createSpider(24, 24, 10, 2, 1, scene);
    const player = game.createPlayer(24, 40, 100, 10, 2, scene);
    const battle = game.startBattle(player, enemy, [1, 1], scene);
    expect(battle).toStrictEqual([1, 1]);
  });
});