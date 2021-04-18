import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 708,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
}