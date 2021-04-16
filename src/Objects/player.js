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
    if (!player){
      return false;
    }
    if (keyCooldown >= cooldown) {
      if (keys.up.isDown) {
        let step = checkMove(map, player.x, player.y - grid, grid);
        makeMove('y', -step);
        keyCooldown = 0;
        roundEnd = true;
      }
      else if (keys.down.isDown) {
        let step = checkMove(map, player.x, player.y + grid, grid);
        makeMove('y', step);
        keyCooldown = 0;
        roundEnd = true;
      }
      else if (keys.left.isDown) {
        let step = checkMove(map, player.x - grid, player.y, grid);
        makeMove('x', -step);
        keyCooldown = 0;
        roundEnd = true;
      }
      else if (keys.right.isDown) {
        let step = checkMove(map, player.x + grid, player.y, grid);
        makeMove('x', step);
        keyCooldown = 0;
        roundEnd = true;
      }
    }
  }

  return {instantiate, move, updateCooldown, getInstance, getRound, setRound};
};

export default Player;