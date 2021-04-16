import 'phaser';

const Player = (name, health, map) => {
  let player;
  let cooldown = 7;
  let keyCooldown = cooldown;
  let grid = 16;

  const instantiate = (startX, startY, scene, scale = 1) => { 
    player = scene.physics.add.sprite(startX, startY, name);
    player.setScale(scale);
  }

  const getPlayerInstance = () => {
    return player;
  }

  const updateCooldown = () => {
    keyCooldown += 1
  }

  const checkMove = (map, x, y) => {
    x = x/grid - 0.5;
    y = y/grid - 0.5;
    if (!map[y] || !map[y][x] || map[y][x].index > 0) {
      return 0;
    }
    return grid;
  }

  const move = (keys) => {
    if (!player){
      return;
    }
    if (keyCooldown >= cooldown) {
      if (keys.up.isDown) {
        let step = checkMove(map, player.x, player.y - grid);
        player.y -= step;
      }
      else if (keys.down.isDown) {
        let step = checkMove(map, player.x, player.y + grid);
        player.y += step;
      }
      else if (keys.left.isDown) {
        let step = checkMove(map, player.x - grid, player.y);
        player.x -= step;
      }
      else if (keys.right.isDown) {
        let step = checkMove(map, player.x + grid, player.y);
        player.x += step;
      }
      keyCooldown = 0;
    }
  }

  return {instantiate, move, updateCooldown, getPlayerInstance};
};

export default Player;