import 'phaser';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 708,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
}