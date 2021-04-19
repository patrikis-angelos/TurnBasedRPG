import Phaser from 'phaser';
import config from './Config/config';
import boot from './Scenes/boot';
import preloader from './Scenes/preloader';
import title from './Scenes/title';
import game from './Scenes/game';
import ui from './Scenes/UIScene';
import score from './Scenes/scores';

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Boot', boot);
    this.scene.add('Preloader', preloader);
    this.scene.add('Title', title);
    this.scene.add('Game', game);
    this.scene.add('UIScene', ui);
    this.scene.add('Score', score);
    this.scene.start('Boot');
  }
}

window.game = new Game();