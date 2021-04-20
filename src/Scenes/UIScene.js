import Phaser from 'phaser';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UIScene');
  }

  init(data) {
    this.player = data.player;
    this.p = this.player.getInstance();
  }

  createUI(x, y, w, h) {
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.lineStyle(5, 0x000000);
    this.graphics.fillRect(x, y, w - 5, h - 5);
    this.graphics.strokeRect(x + 5, y + 2.5, 800 - 7.5, h - 5);
  }

  createField(x, y, name, value) {
    const text = this.add.text(x, y, `${name}: ${value}`);
    text.setScale(1.5);
    return text;
  }

  create() {
    const canvasHeight = this.sys.game.canvas.height;
    const uiHeight = 100;
    const uiStartY = canvasHeight - uiHeight;
    this.graphics = this.add.graphics();

    this.createUI(0, uiStartY, 800, uiHeight);

    this.rect = this.player.createHealthBar(
      this,
      20,
      uiStartY + 10,
      380,
      20,
      0xff0000,
      this.sys.game.globals.playerName,
    );

    this.scoreText = this.createField(20, uiStartY + 70, 'Score', 0);
    this.createField(430, uiStartY + 10, 'Attack', this.player.getAttack());
    this.createField(430, uiStartY + 40, 'Defence', this.player.getDefence());
  }

  update() {
    const score = this.player.getScore();
    this.scoreText.setText(`Score: ${score}`);
  }
}