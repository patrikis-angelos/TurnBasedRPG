import 'phaser';
import bar from '../Modules/bar';
import start from '../assets/buttons/start.png';
import start_hover from '../assets/buttons/start-hover.png';
import map from '../assets/map/map.json';
import field from '../assets/map/spritesheet.png';
import rpg from '../assets/mapTest/RPG.json';
import town from '../assets/mapTest/tiles-map.png';
import transparent_town from '../assets/mapTest/transparent-bg-tiles.png';
import warrior from '../assets/characters/icon_01.png';


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
    this.load.tilemapTiledJSON('map', map);
    this.load.image('field', field);
    this.load.image('warrior', warrior);
    this.load.image('town', town);
    this.load.image('transparent_town', transparent_town);
    this.load.tilemapTiledJSON('rpg', rpg);
  }

  update() {
    this.readyCtr += 1;
    if (this.loaded) {
      this.ready();
    }
  }
}