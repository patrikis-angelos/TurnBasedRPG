import 'phaser';
import Character from './character';

const Player = (name, health, attack, defence, map) => {
  let cooldown = 7;
  let movementCooldown = cooldown;
  let roundEnd = false;
  let healthBar;
  let score = 0;

  const {instantiate, 
    getInstance, 
    checkBlock, 
    makeMove, 
    getAttack,
    getDefence,  
    attackTarget, 
    takeDamage, 
    getHealth,
    die,
    getActive} = Character(name, health, attack, defence, map)

  const updateCooldown = () => {
    movementCooldown += 1
  }

  const getRound = () => {
    return roundEnd;
  }

  const setRound = (round) => {
    roundEnd = round;
  }

  const getScore = () => {
    return score;
  }

  const updateScore = () => {
    score += 1;
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
      if (map[targetY] && map[targetY][targetX] && map[targetY][targetX].occupied) 
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
    if (movementCooldown >= cooldown) {
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
        movementCooldown = 0;
        roundEnd = true;
      }
    }
  }

  const createHealthBar = (scene, x, y, w, h, color) => {
    let margin = 30;
    let healthText = scene.add.text(x, y, 'Health');
    healthText.setScale(1.5);

    scene.graphics.lineStyle(5, 0x000000);
    let persentage = getHealth()/100;
    scene.graphics.strokeRect(x, y + margin, w, h);
    healthBar = scene.add.rectangle(x + 2.5,y + margin + 2.5, (w - 5)*persentage, h - 5, color).setOrigin(0, 0);
    return healthBar;
  }

  const updateHealthBar = (scene) => {
    let health = getHealth();
    let percentage = health/100;
    healthBar.setSize(percentage*380 - 5, 15);
  }

  return {instantiate, 
    move, 
    updateCooldown, 
    getInstance, 
    getRound, 
    setRound, 
    getAttack,
    getDefence,
    attackTarget, 
    takeDamage, 
    checkSurroundings,
    getHealth,
    die,
    createHealthBar,
    updateHealthBar,
    getScore,
    updateScore,
    getActive};
};

export default Player;