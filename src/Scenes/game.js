import 'phaser';
import '../Objects/player';
import Player from '../Objects/player';

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
    this.map = this.make.tilemap({ key: 'rpg' });
    let town = this.map.addTilesetImage('tiles', 'town');
    let trans_town = this.map.addTilesetImage('transparent', 'transparent_town');
    this.map.createLayer('Grass', town, 0, 0);
    this.map.createLayer('Obstacles', town, 0, 0);
    let foreground = this.map.createLayer('Overground', trans_town, 0, 0);
    foreground.depth = 100;
  }

  preload() {
  }

  create() {
    this.cameras.main.setZoom(2);
    this.cameras.main.setBounds(0, 0, 800, 608);
    this.createMap();
    let tiles = this.map.layers[1].data;

    this.player = Player('warrior', tiles);
    this.player.instantiate(8, 8, this);
    let p = this.player.getPlayerInstance();
    this.cameras.main.startFollow(p);
    this.movementKeys();
  }

  update() {
    this.player.move(this.keys);
    this.player.updateCooldown();
  }
}