import 'phaser';
import Character from './character';

const Enemy = (name, health, map) => {
  let directions = [[0, 1],[0, -1],[1, 0],[-1, 0]];
  const {instantiate, getInstance, checkMove, makeMove} = Character(name, health);

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
      if (checkMove(map, nextX, nextY) > 0) {
        available.push(dir);
      }
    });
    let index = Math.floor(Math.random()*available.length)
    let nextMove = available[index];
    makeMove(nextMove, step);
  }

  return {instantiate, getInstance, move};
}

export default Enemy;