import 'phaser';
import Obj from './object';

export default class SceneButton extends Obj {
  constructor(x, y, name, scene, targetScene, scale = 1) {
    super(x, y, name, scene, scale);
    this.targetScene = targetScene;
    this.button = this.instantiateInteractive();

    this.button.on('pointerdown', function () {
      this.scene.scene.start(targetScene);
    });

    this.button.on('pointerover', function () {
      this.setTexture('start_hover');
    });

    this.button.on('pointerout', function () {
      this.setTexture('start');
    });
  }
}
