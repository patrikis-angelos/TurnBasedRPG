import 'phaser';
import SceneButton from '../Objects/button';


export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    const button = SceneButton('start', 'Game');
    button.instantiate(400, 300, this, 3);
  }
}