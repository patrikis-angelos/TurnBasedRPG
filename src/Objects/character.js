import 'phaser';

const Character = (name, health) => {
  let character;

  const instantiate = (startX, startY, scene, scale = 1) => { 
    character = scene.physics.add.sprite(startX, startY, name);
    character.setScale(scale);
  }

  const getInstance = () => {
    return character;
  }

  const checkMove = (map, x, y) => {
    let grid = 16;
    x = x/grid - 0.5;
    y = y/grid - 0.5;
    if (!map[y] || !map[y][x] || map[y][x].index > 0) {
      return 0;
    }
    return grid;
  }

  const makeMove = (direction, value) => {
    let character = getInstance();
    if (!character){
      return false;
    }
    character.y += direction[1]*value;
    character.x += direction[0]*value;
    return true;
  }

  return {instantiate, getInstance, checkMove, makeMove};
}

export default Character;