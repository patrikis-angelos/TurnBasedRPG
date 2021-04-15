import 'phaser';
import logo2 from '../assets/logo2.png';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCtr = 0;
    this.loaded = false;
  }

  ready() {
    if (this.readyCtr >= 100) {
      this.scene.start('Title');
    }
  }

  displayBox() {
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 400, 320, 50);

    return progressBox;
  }

  displayText(width, height, txt, fnt) {
    let text = this.make.text({
      x: width / 2,
      y: height,
      text: txt,
      style: {
        font: `${fnt}px monospace`,
        fill: '#ffffff'
      }
    });
    text.setOrigin(0.5, 0.5);

    return text;
  }

  updateBar(percentText, progressBar) {
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });
  }

  updateText(assetText) {
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
  }

  removeBar(progressBar, progressBox, loadingText, percentText, assetText) {
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.loaded = true;
    }.bind(this));
  }

  preload() {
    this.add.image(400, 200, 'logo');

    // display progress bar
    let progressBar = this.add.graphics();
    let progressBox = this.displayBox();
    
    let width = this.cameras.main.width;
    let loadingText = this.displayText(width, 380, 'Loading...', 20);
    let percentText = this.displayText(width, 425, '0%', 18);
    let assetText = this.displayText(width, 470, '', 18);
    
    // update progress bar
    this.updateBar(percentText, progressBar);
    
    // update file progress text
    this.updateText(assetText);
    
    // remove progress bar when complete
    this.removeBar(progressBar, progressBox, loadingText, percentText, assetText);

    // loading assets
    this.load.image('logo2', logo2);
  }

  update() {
    this.readyCtr += 1;
    if (this.loaded) {
      this.ready();
    }
  }
}