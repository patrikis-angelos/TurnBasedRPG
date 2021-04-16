import 'phaser';

const SceneButton = (name, targetScene) => {
  let button;
  const instantiate = (startX, startY, scene, scale = 1) => {
    button = scene.add.sprite(startX, startY, name).setInteractive();
    button.setScale(scale)

    button.on('pointerdown', function () {
      this.scene.scene.start(targetScene);
    });

    button.on('pointerover', function () {
      this.setTexture('start_hover');
    });

    button.on('pointerout', function () {
      this.setTexture('start');
    });
  }

  return {instantiate};
}

export default SceneButton;
