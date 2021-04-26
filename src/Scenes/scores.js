import Phaser from 'phaser';
import SceneButton from '../Objects/button';
import form from '../Modules/form';
import leaderboards from '../Modules/leaderboards';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    form.removeForm(this);
    leaderboards.displayScores(this);
    this.cameras.main.setBackgroundColor('#40b3e6');

    const startButton = SceneButton('start', 'Title');
    startButton.instantiate(400, 600, 'Menu', this, 4);
  }
}