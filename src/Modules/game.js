import Enemy from '../Objects/enemy';
import Player from '../Objects/player';

const gameModule = (() => {
  const createSpider = (x, y, health, attack, defence, scene) => {
    const spider = Enemy ('spider', health, attack, defence, scene.map);
    spider.instantiate(x, y, scene);
    scene.enemies.push(spider);
    spider.createHealth(scene);
  }

  const createPlayer = (health, attack, defence, scene) => {
    const staringX = 13*16 + 8;
    const staringY = 34*16 + 8;
    let player = Player('warrior', health, attack, defence, scene.map);
    player.instantiate(staringX, staringY, scene);
    return player;
  }

  const pickRandomLocation = (scene) => {
    let location = false;
    let mapHeight = scene.map.length;
    let mapWidth = scene.map[0].length;
    let x;
    let y;
    while (!location) {
      let rndX = Math.floor(Math.random()*mapWidth);
      let rndY = Math.floor(Math.random()*mapHeight);
      if (scene.map[rndY] && scene.map[rndY][rndX] && scene.map[rndY][rndX].index === -1 && !scene.map[rndY][rndX].occupied) {
        location = true;
        x = rndX*16 + 8;
        y = rndY*16 + 8;
      }
    }
    return {x, y};
  }

  const collectCoin = (coin, scene) => {
    scene.player.updateScore();
    let position = pickRandomLocation(scene);
    coin.x = position.x;
    coin.y = position.y;
    position = pickRandomLocation(scene);
    createSpider(position.x, position.y, 20, 5, 1, scene);
  }

  const startBattle = (attacker, defender, battlePosition, scene) => {
    attacker.attackTarget(defender);
    defender.updateHealthBar(scene);
    if (defender.die()) {
      scene.map[battlePosition[1]][battlePosition[0]].occupied = false;
      return false;
    }
    return battlePosition;
  }

  const getEnemy = (position, scene) => {
    for (let i = 0; i < scene.enemies.length; i += 1) {
      let e = scene.enemies[i].getInstance();
      if (e.x === position[0]*16 + 8 && e.y === position[1]*16 + 8){
        return scene.enemies[i];
      }
    }
  }

  return {createSpider, createPlayer, pickRandomLocation, collectCoin, getEnemy, startBattle};
})();

export default gameModule;