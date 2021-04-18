import 'phaser';
import Character from './character';

const Player = (name, health, map) => {
  let cooldown = 7;
  let keyCooldown = cooldown;
  let roundEnd = false;

  const {instantiate, getInstance, checkBlock, makeMove, getStats, takeDamage} = Character(name, health, map)

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
      if (checkBlock(player.x + 16*direction[0], player.y + 16*direction[1]) && 
      map[y + direction[1]][x + direction[0]].occupied) 
      {
        return [x + direction[0], y + direction[1]];
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
      if (keys.up.isDown) {
        availiable = checkBlock(player.x, player.y - step, step);
        direction = [0, -1];
        moved = true;
      }
      else if (keys.down.isDown) {
        availiable = checkBlock(player.x, player.y + step, step);
        direction = [0, 1];
        moved = true;
      }
      else if (keys.left.isDown) {
        availiable = checkBlock(player.x - step, player.y, step);
        direction = [-1, 0];
        moved = true;
      }
      else if (keys.right.isDown) {
        availiable = checkBlock(player.x + step, player.y, step);
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

  return {instantiate, move, updateCooldown, getInstance, getRound, setRound, getStats, takeDamage, checkSurroundings};
};

export default Player;