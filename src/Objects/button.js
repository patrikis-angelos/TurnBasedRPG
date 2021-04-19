const SceneButton = (name, targetScene) => {
  let button;
  const instantiate = (startX, startY, text, scene, scale = 1) => {
    button = scene.add.sprite(startX, startY, name).setInteractive();
    const buttonText = scene.add.text(startX, startY, text).setOrigin(0.5);
    buttonText.setScale(1.5);
    button.setScale(scale);

    button.on('pointerdown', function () {
      this.scene.scene.start(targetScene);
    });

    button.on('pointerover', function () {
      this.setTexture('start_hover');
    });

    button.on('pointerout', function () {
      this.setTexture('start');
    });
  };

  return { instantiate };
};

export default SceneButton;
