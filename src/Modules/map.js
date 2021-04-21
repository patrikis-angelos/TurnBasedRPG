const map = (() => {
  const createMap = (scene) => {
    const map = scene.make.tilemap({ key: 'rpg_map' });
    const town = map.addTilesetImage('town', 'town');
    const transTown = map.addTilesetImage('transparent', 'transparent_town');
    map.createLayer('Grass', town, 0, 0);
    map.createLayer('Obstacles', transTown, 0, 0);
    const foreground = map.createLayer('Foreground', transTown, 0, 0);
    foreground.depth = 100;
    return map;
  };

  return { createMap };
})();

export default map;