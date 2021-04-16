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

  preload() {
  }

  create() {
    this.cooldown = 1;
    this.keyCooldown = this.cooldown

    // map
    let map = this.make.tilemap({ key: 'map' });
    let field = map.addTilesetImage('field', 'field');
        
	  let grass = map.createLayer('Grass', field, 0, 0);
    let obstacles = map.createLayer('Obstacles', field, 0, 0);
    let tiles = map.layers[1].data;
    //map

    this.player = Player('warrior', tiles);
    this.player.instantiate(8, 8, this);
    this.movementKeys();
  }

  update() {
    this.player.move(this.keys);
    this.player.updateCooldown();
  }
}