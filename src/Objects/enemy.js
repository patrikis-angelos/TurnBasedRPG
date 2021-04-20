import Character from './character';

const Enemy = (name, health, attack, defence, map) => {
  let healthBar;
  const step = 16;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  const {
    instantiate,
    getInstance,
    checkBlock,
    makeMove,
    attackTarget,
    takeDamage,
    getAttack,
    getDefence,
    getHealth,
    die,
    getActive,
  } = Character(name, health, attack, defence, map);

  const randomMove = () => {
    const enemy = getInstance();
    const available = [];
    directions.forEach((dir) => {
      const nextX = enemy.x / step - 0.5 + dir[0];
      const nextY = enemy.y / step - 0.5 + dir[1];
      if (checkBlock(nextX, nextY)) {
        available.push(dir);
      }
    });
    const index = Math.floor(Math.random() * available.length);
    const nextMove = available[index];
    if (nextMove) {
      return nextMove;
    }
    return false;
  };

  const createHealth = (scene) => {
    const enemy = getInstance();
    const percentage = health / 20;
    healthBar = scene.add.rectangle(
      enemy.x - 8,
      enemy.y - 8,
      16 * percentage,
      2,
      0xff0000,
    ).setOrigin(0, 0);
  };

  const updateHealthPosition = () => {
    const enemy = getInstance();
    healthBar.x = enemy.x - 8;
    healthBar.y = enemy.y - 8;
  };

  const updateHealthBar = () => {
    if (!getActive()) {
      return;
    }
    const health = getHealth();
    const percentage = health / 20;
    healthBar.setSize(percentage * 20, 2);
  };

  const move = () => {
    if (!getActive()) {
      return;
    }
    const move = randomMove();
    if (move) {
      makeMove(move, step);
    }
    updateHealthPosition();
  };

  return {
    instantiate,
    getInstance,
    move,
    attackTarget,
    takeDamage,
    getAttack,
    getDefence,
    createHealth,
    updateHealthBar,
    die,
    getHealth,
    randomMove,
    getActive,
  };
};

export default Enemy;