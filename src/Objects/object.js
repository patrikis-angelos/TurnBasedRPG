export default class Obj extends Phaser.GameObjects.Container{
  constructor(x, y, name, scene, scale = 1) {
    super(scene);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.name = name;
    this.scale = scale;
  }

  instantiate() {
    const obj = this.scene.add.sprite(this.x, this.y, this.name);
    obj.setScale(this.scale);
    return obj;
  }

  instantiateInteractive() {
    const obj = this.scene.add.sprite(this.x, this.y, this.name).setInteractive();
    obj.setScale(this.scale);
    return obj;
  }
};
