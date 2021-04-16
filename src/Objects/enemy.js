import 'phaser';
import Character from './character';

const Enemy = (name, health, map) => {
  const {instantiate, getInstance, checkMove, makeMove} = Character(name, health);

  const move = () => {
    makeMove('y', 16);
  }

  return {instantiate, getInstance, move};
}

export default Enemy;