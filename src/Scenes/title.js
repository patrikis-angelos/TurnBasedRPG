import SceneButton from '../Objects/button';
import form from '../Modules/form';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    form.createForm();
    this.cameras.main.setBackgroundColor('#40b3e6')

    const startButton = SceneButton('start', 'Game');
    startButton.instantiate(400, 250, 'Start', this, 4);

    const scoreButton = SceneButton('start', 'Score');
    scoreButton.instantiate(400, 350, 'Leaderboards', this, 4);
  }
}