import 'phaser';

const map = (() => {
  const createMap = (scene) => {
    let map = scene.make.tilemap({ key: 'rpg_map' });
    let town = map.addTilesetImage('town', 'town');
    let trans_town = map.addTilesetImage('transparent', 'transparent_town');
    map.createLayer('Grass', town, 0, 0);
    map.createLayer('Obstacles', trans_town, 0, 0);
    let foreground = map.createLayer('Foreground', trans_town, 0, 0);
    foreground.depth = 100;
    return map;
  }

  return {createMap};
})();

export default map;