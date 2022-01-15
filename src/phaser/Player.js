import playGame from './scene';
export const  Direction = {
    NONE : 'none',
    LEFT : 'left',
    UP : 'up',
    RIGHT : 'right',
    DOWN : 'down'
}
export class Player {
    // container:Phaser.GameObjects.Container;
    constructor(sprite, tilePos) {
        const offsetX = playGame.TILE_SIZE / 2;
        const offsetY = playGame.TILE_SIZE;
        this.sprite = sprite;
        this.tilePos = tilePos;
        // (this.sprite.body as Phaser.Physics.Arcade.Body).setOrigin(0.5, 1);
        sprite.setPosition(tilePos.x * playGame.TILE_SIZE + offsetX, tilePos.y * playGame.TILE_SIZE + offsetY);
        // this.sprite.setFrame(55);
    }

    getPosition() {
        return new Phaser.Math.Vector2(this.sprite.x, this.sprite.y);
    }

    setPosition(position) {
        this.sprite.setPosition(position.x, position.y);
    }

    stopAnimation(direction) {
        // const animationManager = this.sprite.anims.animationManager;
        // const standingFrame = animationManager.get(direction).frames[1].frame.name;
        // this.sprite.anims.stop();
        // this.sprite.setFrame(standingFrame);
    }

    startAnimation(direction) {
        // this.sprite.anims.play(direction);
    }

    getTilePos() {
        return this.tilePos.clone();
    }

    setTilePos(tilePosition) {
        this.tilePos = tilePosition.clone();
    }
}
