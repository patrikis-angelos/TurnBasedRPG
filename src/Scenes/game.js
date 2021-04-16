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

  preload() {
  }

  create() {
    this.following = true;
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, 400, 608);
    let map = this.createMap();
    this.tiles = map.layers[1].data;

    this.player = Player('warrior', 100, this.tiles);
    const staringX = 13*16 + 8;
    const staringY = 34*16 + 8;
    this.player.instantiate(staringX, staringY, this);
    let p = this.player.getInstance();
    this.cameras.main.startFollow(p, false, 0.05, 0.05);
    this.movementKeys();

    this.enemies = [];
    const spiderX = 13*16 + 8;
    const spiderY = 25*16 + 8;
    const spider = Enemy ('spider', 20, this.tiles);
    spider.instantiate(spiderX, spiderY, this);
    this.enemies.push(spider);
  }

  update() {
    this.player.move(this.keys);
    this.player.updateCooldown();
    if (this.player.getRound()) {
      this.player.setRound(false);
      this.enemies.forEach((enemy) => {
        enemy.move();
      });
    }
  }
}