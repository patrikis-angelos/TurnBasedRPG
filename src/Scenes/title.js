import Phaser from 'phaser';
import SceneButton from '../Objects/button';
import form from '../Modules/form';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    form.showForm();
    this.cameras.main.setBackgroundColor('#40b3e6');
    const title = this.add.text(400, 100, 'Spiders').setOrigin(0.5, 0.5);
    title.setScale(4);

    const startButton = SceneButton('start', 'Game');
    startButton.instantiate(400, 250, 'Start', this, 4);

    const scoreButton = SceneButton('start', 'Score');
    scoreButton.instantiate(400, 350, 'Leaderboards', this, 4);
  }
}