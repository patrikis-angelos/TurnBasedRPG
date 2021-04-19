const barModule = (() => {
  const updateBar = (scene, percentText, progressBar) => {
    scene.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 400, 300 * value, 30);
    });
  };

  const displayBox = (scene) => {
    const progressBox = scene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 400, 320, 50);

    return progressBox;
  };

  const displayText = (scene, width, height, txt, fnt) => {
    const text = scene.make.text({
      x: width / 2,
      y: height,
      text: txt,
      style: {
        font: `${fnt}px monospace`,
        fill: '#ffffff',
      },
    });
    text.setOrigin(0.5, 0.5);

    return text;
  };

  const updateText = (scene, assetText) => {
    scene.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });
  };

  const removeBar = (scene, progressBar, progressBox, loadingText, percentText, assetText) => {
    scene.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      scene.loaded = true;
    });
  };

  return {
    updateBar, displayBox, displayText, updateText, removeBar,
  };
})();

export default barModule;