import Phaser from "phaser";
import tiles from "../assets/tilemaps/dungeon.png";
import dungeon from "../assets/dungeons/dungeon.json";
import playerImg from "../assets/sprites/addition.png";
import box from "../assets/tiles/box.jpg";
import { Direction, Player } from './Player';
import { GridPhysics } from './GridPhysics';
import { GridControls } from './GridControl';
class playGame extends Phaser.Scene {
  previousDirection = null;
    static TILE_SIZE = 32;
    player;
    cursors;
    playerGroup;
    gridPhysics;
    gridControls;
    constructor() {
        super({
            key: 'PlayGame'
        });
    }
  preload() {
    this.load.image('tiles', tiles);
        this.load.tilemapTiledJSON('dungeon', dungeon);
        this.load.image('player', playerImg);
        this.load.image('box', box);
  }
  create() {
    let map = this.make.tilemap({ key: 'dungeon' });
    let tileset = map.addTilesetImage('dungeon', 'tiles');
    map.createLayer(1, tileset, 0, 0);
    let layer = map.createLayer(0, tileset, 0, 0);
    layer.setCollisionByProperty({ collides: true });

    this.player = this.physics.add.sprite(0, 0, 'player');
    this.player.setOrigin(0.5, 1);

    let box = this.physics.add.sprite(120, 230, 'box');
    box.setOrigin(0.5, 1);
    this.playerGroup = this.add.container(0, 0);
    this.playerGroup.add(this.player);

    this.physics.add.collider(this.player, box, this.addSpriteToPlayer.bind(this, box, this.player));
    this.physics.world.enable(this.playerGroup);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.playerGroup, false);

    const player = new Player(this.playerGroup, new Phaser.Math.Vector2(3, 0));

        this.gridPhysics = new GridPhysics(player, map);
        this.gridControls = new GridControls(this.input, this.gridPhysics);
  }

  addSpriteToPlayer(box, e) {
    console.log(box, e);
    this.playerGroup.add(box);
    let xPos, yPos;
    if (this.previousDirection === Direction.LEFT) {
        xPos = this.player.x - playGame.TILE_SIZE;
        yPos = this.player.y;
    } else if (this.previousDirection === Direction.RIGHT) {
        xPos = this.player.x + playGame.TILE_SIZE;
        yPos = this.player.y;
    } else if (this.previousDirection === Direction.UP) {
        xPos = this.player.x;
        yPos = this.player.y - playGame.TILE_SIZE;
    } else if (this.previousDirection === Direction.DOWN) {
        xPos = this.player.x;
        yPos = this.player.y + playGame.TILE_SIZE;
    }
    box.setPosition(xPos, yPos);
}

update(time, delta) {
    if (this.cursors.left.isDown) {
        this.previousDirection = Direction.LEFT;
    }
    if (this.cursors.right.isDown) {
        this.previousDirection = Direction.RIGHT;
    }
    if (this.cursors.down.isDown) {
        this.previousDirection = Direction.DOWN;
    }
    if (this.cursors.up.isDown) {
        this.previousDirection = Direction.UP;
    }
    this.gridControls.update();
    this.gridPhysics.update(delta);
}
}

export default playGame;
