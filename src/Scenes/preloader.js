import Phaser from 'phaser';
import form from '../Modules/form';
import bar from '../Modules/bar';
import start from '../assets/buttons/button.png';
import startHover from '../assets/buttons/button_hover.png';
import rpgMap from '../assets/map/rpg_map.json';
import town from '../assets/map/tiles-map.png';
import transparentTown from '../assets/map/transparent-bg-tiles.png';
import warrior from '../assets/characters/icon_01.png';
import spider from '../assets/enemies/icon_29.png';
import coin from '../assets/icon_306.png';
import '../assets/css/style.css';


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

  preload() {
    this.add.image(400, 200, 'logo');

    const progressBar = this.add.graphics();
    const progressBox = bar.displayBox(this);

    const { width } = this.cameras.main;
    const loadingText = bar.displayText(this, width, 380, 'Loading...', 20);
    const percentText = bar.displayText(this, width, 425, '0%', 18);
    const assetText = bar.displayText(this, width, 470, '', 18);

    bar.updateBar(this, percentText, progressBar);
    bar.updateText(this, assetText);
    bar.removeBar(this, progressBar, progressBox, loadingText, percentText, assetText);

    // loading assets
    form.createForm(this);
    this.load.image('start', start);
    this.load.image('start_hover', startHover);
    this.load.image('warrior', warrior);
    this.load.image('town', town);
    this.load.tilemapTiledJSON('rpg_map', rpgMap);
    this.load.image('transparent_town', transparentTown);
    this.load.image('spider', spider);
    this.load.image('coin', coin);
  }

  update() {
    this.readyCtr += 1;
    if (this.loaded) {
      this.ready();
    }
  }
}