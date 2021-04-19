const Character = (name, health, attack, defence, map) => {
  let character;
  const grid = 16;
  let active;

  const instantiate = (startX, startY, scene, scale = 1) => {
    character = scene.physics.add.sprite(startX, startY, name);
    character.setScale(scale);
    active = true;
  };

  const getInstance = () => character;

  const updatePosition = (x, y, direction) => {
    if (!active) {
      return;
    }
    x = x / grid - 0.5;
    y = y / grid - 0.5;
    map[y][x].occupied = false;
    map[y + direction[1]][x + direction[0]].occupied = name;
  };

  const checkBlock = (x, y) => {
    if (!active) {
      return false;
    }
    if (!map[y] || !map[y][x] || map[y][x].index > 0 || map[y][x].occupied) {
      return false;
    }
    return true;
  };

  const makeMove = (direction, value) => {
    if (!character) {
      return false;
    }
    updatePosition(character.x, character.y, direction);
    character.y += direction[1] * value;
    character.x += direction[0] * value;
    return true;
  };

  const getHealth = () => health;

  const getActive = () => active;

  const getAttack = () => attack;

  const getDefence = () => defence;

  const attackTarget = (target) => {
    if (!active) {
      return;
    }
    target.takeDamage(attack);
  };

  const takeDamage = (damage) => {
    if (!active) {
      return;
    }
    health = health - damage + defence;
  };

  const die = () => {
    if (!active) {
      return false;
    }
    if (health <= 0) {
      character.setActive(false).setVisible(false);
      active = false;
      return true;
    }
    return false;
  };

  return {
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
  };
};

export default Character;