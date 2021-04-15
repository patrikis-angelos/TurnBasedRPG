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
    this.obj = this.scene.add.sprite(this.x, this.y, this.name);
    this.obj.setScale(this.scale);
    return this.obj;
  }

  instantiateInteractive() {
    this.obj = this.scene.add.sprite(this.x, this.y, this.name).setInteractive();
    this.obj.setScale(this.scale);
    return this.obj;
  }

  destroy() {
    this.obj.destroy();
  }
};
