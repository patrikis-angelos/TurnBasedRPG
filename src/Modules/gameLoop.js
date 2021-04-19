const gameLoop = (() => {

  const movement = (scene) => {
    scene.player.move(scene.keys);
    scene.player.updateCooldown();
    if (scene.player.getRound()) {
      scene.player.setRound(false);
      scene.enemies.forEach((enemy) => {
        enemy.move();
      });
    }
  }

  return {movement};

})();

export default gameLoop;