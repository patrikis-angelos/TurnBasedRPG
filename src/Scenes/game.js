import Phaser from 'phaser';
import '../Objects/player';
import map from '../Modules/map';
import camera from '../Modules/camera';
import gameModule from '../Modules/game';
import gameLoop from '../Modules/gameLoop';
import form from '../Modules/form';
import leaderboards from '../Modules/leaderboards';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.battleCooldown = 0;
  }

  movementKeys() {
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });
  }

  initializeBattle() {
    this.battleCooldown = 0;
    this.playerAttack = false;
    this.enemy = gameModule.getEnemy(this.battle, this);
  }

  enemyTurn() {
    this.battle = gameModule.startBattle(this.enemy, this.player, this.battle, this);
    this.battleCooldown = 0;
    this.playerAttack = false;
  }

  playerTurn() {
    this.battle = gameModule.startBattle(this.player, this.enemy, this.battle, this);
    this.playerAttack = true;
  }


  create() {
    form.removeForm(this);
    this.graphics = this.add.graphics();
    const tiles = map.createMap(this);
    this.map = tiles.layers[1].data;
    const staringX = 13 * 16 + 8;
    const staringY = 34 * 16 + 8;
    this.player = gameModule.createPlayer(staringX, staringY, 100, 5, 2, this);
    const playerInstance = this.player.getInstance();
    playerInstance.setDepth(2);

    camera.setCamera(playerInstance, this);
    this.movementKeys();

    this.enemies = [];

    const spiderPosition = gameModule.pickRandomLocation(this);
    gameModule.createSpider(spiderPosition.x, spiderPosition.y, 20, 5, 1, this);

    const coinPosition = gameModule.pickRandomLocation(this);
    const coin = this.physics.add.sprite(coinPosition.x, coinPosition.y, 'coin');
    this.physics.add.overlap(
      playerInstance,
      coin,
      gameModule.collectCoin.bind(this, coin, this), null, this,
    );

    this.scene.launch('UIScene', { player: this.player });
  }

  update() {
    if (!this.battle) {
      gameLoop.movement(this);
      this.battle = this.player.checkSurroundings();
      if (this.battle) {
        this.initializeBattle();
      }
    } else {
      this.battleCooldown += 1;
      if (this.battleCooldown >= 30) {
        this.enemyTurn();
        // Checking if player died after the enemy attack
        if (!this.player.getActive()) {
          const { playerName } = this.sys.game.globals;
          const submit = leaderboards.saveScore(playerName, this.player.getScore());
          this.scene.stop('UIScene');
          submit.then(() => {
            this.scene.start('Score');
          }).catch(() => {
            this.scene.start('Game');
          });
        }
      } else if (this.battleCooldown >= 15 && !this.playerAttack) {
        this.playerTurn();
      }
    }
  }
}