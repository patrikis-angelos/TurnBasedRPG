import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  create() {
    let canvasHeight = this.sys.game.canvas.height;
    let uiHeight = 200;
    let uiStartY = canvasHeight - uiHeight;
    this.graphics = this.add.graphics();
    this.graphics.fillStyle(0x031f4c, 1); 
    this.graphics.fillRect(0, uiStartY, 800, uiHeight);
  }
}