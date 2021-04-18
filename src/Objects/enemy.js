import 'phaser';
import Character from './character';

const Enemy = (name, health, map) => {
  let directions = [[0, 1],[0, -1],[1, 0],[-1, 0]];
  const {instantiate, getInstance, checkBlock, makeMove, attack, takeDamage, getStats} = Character(name, health, map);

  const move = () => {
    randomMove();
  }

  const randomMove = () => {
    let step = 16;
    let enemy = getInstance();
    let available  = [];
    directions.forEach((dir) => {
      let nextX = enemy.x + step*dir[0];
      let nextY = enemy.y + step*dir[1];
      if (checkBlock(nextX, nextY)) {
        available.push(dir);
      }
    });
    let index = Math.floor(Math.random()*available.length)
    let nextMove = available[index];
    makeMove(nextMove, step);
  }

  return {instantiate, getInstance, move, attack, takeDamage, getStats};
}

export default Enemy;