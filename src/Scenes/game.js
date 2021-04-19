import 'phaser';
import '../Objects/player';
import Player from '../Objects/player';
import Enemy from '../Objects/enemy';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  movementKeys() {
    this.keys = this.input.keyboard.addKeys({
      'up': Phaser.Input.Keyboard.KeyCodes.W,
      'down': Phaser.Input.Keyboard.KeyCodes.S,
      'left': Phaser.Input.Keyboard.KeyCodes.A,
      'right': Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  createMap () {
    let map = this.make.tilemap({ key: 'rpg_map' });
    let town = map.addTilesetImage('town', 'town');
    let trans_town = map.addTilesetImage('transparent', 'transparent_town');
    map.createLayer('Grass', town, 0, 0);
    map.createLayer('Obstacles', trans_town, 0, 0);
    let foreground = map.createLayer('Foreground', trans_town, 0, 0);
    foreground.depth = 100;
    return map;
  }

  setCamera(player) {
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, 400, 658);
    this.cameras.main.startFollow(player, false, 0.05, 0.05, 0, -50);
  }

  startBattle(attacker, defender) {
    attacker.attackTarget(defender);
    defender.updateHealthBar(this);
    console.log(defender.getHealth());
    if (defender.die()) {
      this.map[this.battle[1]][this.battle[0]].occupied = false;
      this.battle = false;
    }
  }

  getEnemy(position) {
    for (let i = 0; i < this.enemies.length; i += 1) {
      let e = this.enemies[i].getInstance();
      if (e.x === position[0]*16 + 8 && e.y === position[1]*16 + 8){
        return this.enemies[i];
      }
    }
  }

  collectCoin(coin) {
    this.player.updateScore();
    let position = this.pickRandomLocation();
    coin.x = position.x;
    coin.y = position.y;
    position = this.pickRandomLocation();
    this.createSpider(position.x, position.y, 20, 5, 1);
  }

  pickRandomLocation() {
    let location = false;
    let mapHeight = this.map.length;
    let mapWidth = this.map[0].length;
    let x;
    let y;
    while (!location) {
      let rndX = Math.floor(Math.random()*mapWidth);
      let rndY = Math.floor(Math.random()*mapHeight);
      if (this.map[rndY] && this.map[rndY][rndX] && this.map[rndY][rndX].index === -1 && !this.map[rndY][rndX].occupied) {
        location = true;
        x = rndX*16 + 8;
        y = rndY*16 + 8;
      }
    }
    return {x, y};
  }

  createSpider(x, y, health, attack, defence) {
    const spider = Enemy ('spider', health, attack, defence, this.map);
    spider.instantiate(x, y, this);
    this.enemies.push(spider);
    spider.createHealth(this);
  }

  create() {
    this.graphics = this.add.graphics();
    this.battleCooldown = 0; 
    let tiles = this.createMap();
    this.map = tiles.layers[1].data;

    const staringX = 13*16 + 8;
    const staringY = 34*16 + 8;
    this.player = Player('warrior', 100, 5, 2, this.map);
    this.player.instantiate(staringX, staringY, this);

    let playerInstance = this.player.getInstance();
    playerInstance.setDepth(2);
    this.setCamera(playerInstance);

    this.movementKeys();

    this.enemies = [];
    const spiderX = 13*16 + 8;
    const spiderY = 25*16 + 8;

    this.createSpider(spiderX, spiderY, 20, 5, 1);

    const coin = this.physics.add.sprite(8, 8, 'coin');
    this.physics.add.overlap(playerInstance, coin, this.collectCoin.bind(this, coin), null, this);

    this.scene.launch('UIScene', {player: this.player});
  }

  update() {
    if (!this.battle) {
      this.player.move(this.keys);
      this.player.updateCooldown();
      if (this.player.getRound()) {
        this.player.setRound(false);
        this.enemies.forEach((enemy) => {
          enemy.move();
        });
      }
      this.battle = this.player.checkSurroundings();
      if (this.battle) {
        this.battleCooldown = 0;
        this.playerAttack = false;
        this.enemy = this.getEnemy(this.battle);
      }
    } else {
      this.battleCooldown += 1;
      if (this.battleCooldown >= 60) {
        this.startBattle(this.enemy, this.player);
        this.battleCooldown = 0;
        this.playerAttack = false;
      } else if (this.battleCooldown >= 30) {
        if (!this.playerAttack) {
          this.startBattle(this.player, this.enemy);
          this.playerAttack = true;
        }
      }
    }
  }
}