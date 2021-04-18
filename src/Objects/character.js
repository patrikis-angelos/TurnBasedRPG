import 'phaser';

const Character = (name, health, map) => {
  let character;
  let grid = 16;

  const instantiate = (startX, startY, scene, scale = 1) => { 
    character = scene.physics.add.sprite(startX, startY, name);
    character.setScale(scale);
  }

  const getInstance = () => {
    return character;
  }

  const updatePosition = (x, y, direction) => {
    x = x/grid - 0.5;
    y = y/grid - 0.5;
    map[y][x].occupied = false;
    map[y + direction[1]][x + direction[0]].occupied = name;
  }

  const checkBlock = (x, y) => {
    x = x/grid - 0.5;
    y = y/grid - 0.5;
    if (!map[y] || !map[y][x] || map[y][x].index > 0) {
      return false;
    }
    return true;
  }

  const makeMove = (direction, value) => {
    if (!character){
      return false;
    }
    updatePosition(character.x, character.y, direction);
    character.y += direction[1]*value;
    character.x += direction[0]*value;
    return true;
  }

  const getStats = () => {
    return [name, health];
  }

  const attack = (target, damage) => {
    target.takeDamage(damage);
  }

  const takeDamage = (damage) => {
    health -= damage;
  }

  return {instantiate, getInstance, checkBlock, makeMove, attack, takeDamage, getStats};
}

export default Character;