import 'phaser';
import Character from './character';

const Enemy = (name, health, attack, defence, map) => {
  let healthBar;
  let directions = [[0, 1],[0, -1],[1, 0],[-1, 0]];
  const {instantiate, 
    getInstance, 
    checkBlock, 
    makeMove, 
    attackTarget, 
    takeDamage, 
    getAttack,
    getDefence, 
    getHealth,
    die, 
    getActive} = Character(name, health, attack, defence, map);

  const move = () => {
    if (!getActive()) {
      return;
    }
    randomMove();
    updateHealthPosition();
  }

  const randomMove = () => {
    let step = 16;
    let enemy = getInstance();
    let available  = [];
    directions.forEach((dir) => {
      let nextX = enemy.x/step - 0.5 + dir[0];
      let nextY = enemy.y/step - 0.5 + dir[1];
      if (checkBlock(nextX, nextY)) {
        available.push(dir);
      }
    });
    let index = Math.floor(Math.random()*available.length)
    let nextMove = available[index];
    if (nextMove) {
      makeMove(nextMove, step);
    }
  }

  const createHealth = (scene) => {
    let enemy = getInstance();
    let percentage = health/20;
    healthBar = scene.add.rectangle(enemy.x - 8, enemy.y - 8, 16*percentage, 2, 0xff0000).setOrigin(0, 0);
  }

  const updateHealthPosition = () => {
    let enemy = getInstance();
    healthBar.x = enemy.x - 8;
    healthBar.y = enemy.y - 8;
  }

  const updateHealthBar = () => {
    if (!getActive()){
      return;
    }
    let health = getHealth();
    let percentage = health/20;
    healthBar.setSize(percentage*20, 2);
  }

  return {instantiate, 
    getInstance, 
    move, 
    attackTarget, 
    takeDamage, 
    getAttack,
    getDefence,
    createHealth, 
    updateHealthBar,
    die,
    getHealth};
}

export default Enemy;