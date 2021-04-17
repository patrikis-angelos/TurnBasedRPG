import 'phaser';
import Character from './character';

const Player = (name, health, map) => {
  let cooldown = 7;
  let keyCooldown = cooldown;
  let roundEnd = false;

  const {instantiate, getInstance, checkMove, makeMove} = Character(name, health)

  const updateCooldown = () => {
    keyCooldown += 1
  }

  const getRound = () => {
    return roundEnd;
  }

  const setRound = (round) => {
    roundEnd = round;
  }

  const move = (keys) => {
    let grid = 16;
    let player = getInstance();
    let moved = false;
    let step;
    let direction;
    if (!player){
      return false;
    }
    if (keyCooldown >= cooldown) {
      if (keys.up.isDown) {
        step = checkMove(map, player.x, player.y - grid, grid);
        direction = [0, -1];
        moved = true;
      }
      else if (keys.down.isDown) {
        step = checkMove(map, player.x, player.y + grid, grid);
        direction = [0, 1];
        moved = true;
      }
      else if (keys.left.isDown) {
        step = checkMove(map, player.x - grid, player.y, grid);
        direction = [-1, 0];
        moved = true;
      }
      else if (keys.right.isDown) {
        step = checkMove(map, player.x + grid, player.y, grid);
        direction = [1, 0];
        moved = true;
      }
      if (moved) {
        makeMove(direction, step);
        keyCooldown = 0;
        roundEnd = true;
      }
    }
  }

  return {instantiate, move, updateCooldown, getInstance, getRound, setRound};
};

export default Player;