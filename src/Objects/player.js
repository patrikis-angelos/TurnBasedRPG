import 'phaser';
import Character from './character';

const Player = (name, health, attack, defence, map) => {
  let cooldown = 7;
  let keyCooldown = cooldown;
  let roundEnd = false;
  let active = true;  

  const {instantiate, 
    getInstance, 
    checkBlock, 
    makeMove, 
    getStats, 
    attackTarget, 
    takeDamage, 
    getHealth,
    die} = Character(name, health, attack, defence, map)

  const updateCooldown = () => {
    keyCooldown += 1
  }

  const getRound = () => {
    return roundEnd;
  }

  const setRound = (round) => {
    roundEnd = round;
  }

  const checkSurroundings = () => {
    let player = getInstance();
    let x = player.x/16 - 0.5;
    let y = player.y/16 - 0.5;
    let directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
    for (let i = 0; i < directions.length; i += 1) {
      let direction = directions[i];
      let targetX = x + direction[0];
      let targetY = y + direction[1];
      if (checkBlock(targetX, targetY) && map[targetY][targetX].occupied) 
      {
        return [targetX, targetY];
      }
    }
    return false;
  }

  const move = (keys) => {
    let step = 16;
    let player = getInstance();
    let moved = false;
    let availiable;
    let direction;
    if (!player){
      return false;
    }
    if (keyCooldown >= cooldown) {
      let x = player.x/step - 0.5;
      let y = player.y/step - 0.5;
      if (keys.up.isDown) {
        availiable = checkBlock(x, y - 1, step);
        direction = [0, -1];
        moved = true;
      }
      else if (keys.down.isDown) {
        availiable = checkBlock(x, y + 1, step);
        direction = [0, 1];
        moved = true;
      }
      else if (keys.left.isDown) {
        availiable = checkBlock(x - 1, y, step);
        direction = [-1, 0];
        moved = true;
      }
      else if (keys.right.isDown) {
        availiable = checkBlock(x + 1, y, step);
        direction = [1, 0];
        moved = true;
      }
      if (moved && availiable) {
        makeMove(direction, step);
        keyCooldown = 0;
        roundEnd = true;
      }
    }
  }

  return {instantiate, 
    move, 
    updateCooldown, 
    getInstance, 
    getRound, 
    setRound, 
    getStats, 
    attackTarget, 
    takeDamage, 
    checkSurroundings,
    getHealth,
    die};
};

export default Player;