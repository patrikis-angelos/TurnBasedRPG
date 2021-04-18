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
    this.cameras.main.setBounds(0, 0, 400, 708);
    this.cameras.main.startFollow(player, false, 0.05, 0.05, 0, -50);
  }

  startBattle(attacker, defender) {
    console.log(`${attacker} attacks ${defender}`);
  }

  getEnemy(position) {
    for (let i = 0; i < this.enemies.length; i += 1) {
      let e = this.enemies[i].getInstance();
      if (e.x === position[0]*16 + 8){
        return this.enemies[i];
      }
    }
  }

  preload() {
  }

  create() {
    this.battleCooldown = 0; 
    let tiles = this.createMap();
    this.map = tiles.layers[1].data;

    const staringX = 13*16 + 8;
    const staringY = 34*16 + 8;
    this.player = Player('warrior', 100, this.map);
    this.player.instantiate(staringX, staringY, this);

    let playerInstance = this.player.getInstance();
    this.setCamera(playerInstance);

    this.movementKeys();

    this.enemies = [];
    const spiderX = 13*16 + 8;
    const spiderY = 25*16 + 8;
    const spider = Enemy ('spider', 20, this.map);
    spider.instantiate(spiderX, spiderY, this);
    this.enemies.push(spider);

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
        this.enemy = this.getEnemy(this.battle);
      }
    } else {
      this.battleCooldown += 1;
      if (this.battleCooldown >= 60) {
        this.startBattle('this.enemy', 'this.player');
        this.battleCooldown = 0;
      } else if (this.battleCooldown === 30) {
        this.startBattle('this.player', 'this.enemy');
      }
    }
  }
}