import Character from '../Objects/character';
import MockScene from './sceneMock';

let testCharacter;
let scene = MockScene();
let testMap = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
beforeAll(() => {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1){
      testMap[i][j] = {index: -1, occupied: false};
    }
  }
  testCharacter = Character('warrior', 100, 5, 2, testMap)
  testCharacter.instantiate(8, 8, scene);
});

describe('updatePosition', ()=> {
  it('takes the current position(in pixels) of the character and updates it, given a direction', () => {
    //Moves player from (0, 0) to (1, 0)
    testCharacter.updatePosition(0, 0, [0, 1]);
    expect(testMap[1][0].occupied).toBe(testCharacter.getName());
  });
  it ('updates the last position of the character to false', () => {
    //Moves player from (1, 0) to (1, 1)
    testCharacter.updatePosition(0, 1, [1, 0]);
    expect(testMap[1][0].occupied).toBeFalsy();
  });
  it('returns if the character is dead or not yet instanciated', () => {
    const deadCharacter = Character('warrior', 100, 5, 2, testMap);
    deadCharacter.updatePosition(1, 1, [1, 0]);
    expect(testMap[1][2].occupied).toBeFalsy();
  });
});

describe('checkBlock', () => {
  it('checks if a tile in the map exists (1)', () => {
    const result = testCharacter.checkBlock(1, 2);
    expect(result).toBe(true);
  });
  it('checks if a tile in the map exists (2)', () => {
    const result = testCharacter.checkBlock(10, 10);
    expect(result).toBe(false);
  });
  it('checks if a tile in the map has an obstacle', () => {
    //(2, 2) now has an obstacle
    testMap[2][2].index = 10;
    const result = testCharacter.checkBlock(2, 2);
    expect(result).toBe(false);
  });
  it('checks if a tile in the map is occupied', () => {
    //(1, 1) is occupied from previous tests
    const result = testCharacter.checkBlock(1, 1);
    expect(result).toBe(false);
  });
});

describe('makeMove', () => {
  //reset map
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1){
      testMap[i][j] = {index: -1, occupied: false};
    }
  }
  it('moves the sprite of the character given a direction and value', () => {
    testCharacter.makeMove([0, 1], 16);
    let sprite = testCharacter.getInstance();
    //startY = 8 + 16 = 24
    expect(sprite.y).toBe(24);
  });
  it('returns true if the move was made succesfully', () => {
    let move = testCharacter.makeMove([0, -1], 16);
    expect(move).toBe(true);
  });
  it('returns false if the character is dead or not instanciated yet', () => {
    let deadCharacter = Character('warrior', 100, 5, 2, testMap);
    let move = deadCharacter.makeMove([0, 1], 16);
    expect(move).toBe(false);
  });
});

describe('attackTarget', () => {
  it('damages the target character', () => {
    let enemyCharacter = Character('warrior', 100, 5, 2, testMap);
    enemyCharacter.instantiate(8, 8, scene);
    testCharacter.attackTarget(enemyCharacter);
    expect(enemyCharacter.getHealth()).toBeLessThan(100);
  });
  it('returns if the target id dead or not instantiated yet', () => {
    let enemyCharacter = Character('warrior', 100, 5, 2, testMap);
    testCharacter.attackTarget(enemyCharacter);
    expect(enemyCharacter.getHealth()).toBe(100);
  })
});

describe('takeDamage', () => {
  it('damages self for given amount minus defence', () => {
    testCharacter.takeDamage(20);
    let newHealth = 100 - (20 - testCharacter.getDefence());
    expect(testCharacter.getHealth()).toBe(newHealth);
  });
  it('return if the character is dead or not instantiated yet', () => {
    let deadCharacter = Character('warrior', 100, 5, 2, testMap);
    deadCharacter.takeDamage(80);
    expect(deadCharacter.getHealth()).toBe(100);
  });
});

describe('die', () => {
  it('return true if a character dies', () => {
    let dyingCharacter = Character('warrior', 2, 5, 2, testMap);
    dyingCharacter.instantiate(8, 8, scene)
    dyingCharacter.takeDamage(10);
    let died = dyingCharacter.die();
    expect(died).toBe(true);
  });
  it('diactivates the character if his health is 0 or less', () => {
    testCharacter.takeDamage(200);
    testCharacter.die();
    expect(testCharacter.getActive()).toBe(false);
  });
  it('returns false if a character is already diactivated', () => {
    let died = testCharacter.die();
    expect(died).toBe(false);
  });
});