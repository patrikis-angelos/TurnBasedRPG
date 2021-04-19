const camera = (() => {
  const setCamera = (player, scene) => {
    scene.cameras.main.setZoom(2);
    scene.cameras.main.setBounds(0, 0, 400, 658);
    scene.cameras.main.startFollow(player, false, 0.05, 0.05, 0, -50);
  }

  return {setCamera};
})();

export default camera;