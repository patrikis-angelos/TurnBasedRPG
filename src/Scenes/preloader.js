import 'phaser';
import bar from '../Modules/bar';
import start from '../assets/buttons/start.png';
import start_hover from '../assets/buttons/start-hover.png';
import rpg_map from '../assets/map/rpg_map.json';
import town from '../assets/map/tiles-map.png';
import transparent_town from '../assets/map/transparent-bg-tiles.png';
import warrior from '../assets/characters/icon_01.png';
import spider from '../assets/enemies/icon_29.png';


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

    let progressBar = this.add.graphics();
    let progressBox = bar.displayBox(this);
    
    let width = this.cameras.main.width;
    let loadingText = bar.displayText(this, width, 380, 'Loading...', 20);
    let percentText = bar.displayText(this, width, 425, '0%', 18);
    let assetText = bar.displayText(this, width, 470, '', 18);
    
    bar.updateBar(this, percentText, progressBar);
    bar.updateText(this, assetText);
    bar.removeBar(this, progressBar, progressBox, loadingText, percentText, assetText);

    // loading assets
    this.load.image('start', start);
    this.load.image('start_hover', start_hover);
    this.load.image('warrior', warrior);
    this.load.image('town', town);
    this.load.tilemapTiledJSON('rpg_map', rpg_map);
    this.load.image('transparent_town', transparent_town);
    this.load.image('spider', spider);
  }

  update() {
    this.readyCtr += 1;
    if (this.loaded) {
      this.ready();
    }
  }
}