import SceneButton from '../Objects/button';
import form from '../Modules/form';

export default class ScoresScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    form.removeForm();
    this.cameras.main.setBackgroundColor('#40b3e6')

    const startButton = SceneButton('start', 'Title');
    startButton.instantiate(400, 600, 'Menu', this, 4);
  }
}