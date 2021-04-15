import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    var map = this.make.tilemap({ key: 'map' });
    var field = map.addTilesetImage('field', 'field');
        
	  var grass = map.createStaticLayer('Grass', field, 0, 0);
    var obstacles = map.createStaticLayer('Obstacles', field, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
  }

  update() {

  }
}