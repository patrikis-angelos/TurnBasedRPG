import 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  init(data) {
    this.player = data.player
    let test = this.player.getStats();
    [this.name, this.health] = test;
    this.p = this.player.getInstance();
  }

  createUI(x, y, w, h) {
    this.graphics.fillStyle(0x031f4c, 1); 
    this.graphics.lineStyle(5, 0x000000);
    this.graphics.fillRect(x, y, w - 5, h - 5);
    this.graphics.strokeRect(x + 5, y + 2.5, 800 - 7.5, h - 5);
  }

  createField( x, y, name, value) {
    let text = this.add.text(x, y, `${name}: ${value}`);
    text.setScale(1.5);
    return text;
  }

  createHealthBar(x, y, w, h, value, color) {
    let margin = 30;
    let healthText = this.add.text(x, y, `Health ${value}/${100}`);
    healthText.setScale(1.5);

    this.graphics.lineStyle(5, 0x000000);
    let persentage = this.health/100;
    this.graphics.strokeRect(x, y + margin, w, h);
    let rect = this.add.rectangle(x + 2.5,y + margin + 2.5, (w - 5)*persentage, h - 5, color).setOrigin(0, 0);
    return rect;
  }

  create() {
    let canvasHeight = this.sys.game.canvas.height;
    let uiHeight = 200;
    let uiStartY = canvasHeight - uiHeight;
    this.graphics = this.add.graphics();

    this.createUI(0, uiStartY, 800, uiHeight);

    this.rect = this.createHealthBar(20, uiStartY + 10, 380, 20, this.health, 0xff0000);

    this.createField(20, uiStartY + 70, 'Score', 0);
    this.createField(430, uiStartY + 10, 'Attack', 0);
    this.createField(430, uiStartY + 40, 'Defence', 0);
    this.createField(430, uiStartY + 70, 'Movement Speed', 0);
    this.createField(430, uiStartY + 100, 'Regen', 0);
  }

  update() {
  }
}