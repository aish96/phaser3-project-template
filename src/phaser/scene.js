import Phaser from "phaser";
import tiles from "../assets/tilemaps/dungeon.png";
import dungeon from "../assets/dungeons/dungeon.json";
import addition from "../assets/sprites/addition.png";
import minus from "../assets/sprites/minus.png";
import box0 from "../assets/tiles/0.jpg";
import box1 from "../assets/tiles/1.jpg";
import box2 from "../assets/tiles/2.jpg";
import box3 from "../assets/tiles/3.jpg";
import box4 from "../assets/tiles/4.jpg";
import box5 from "../assets/tiles/5.jpg";
import box6 from "../assets/tiles/6.jpg";
import box7 from "../assets/tiles/7.jpg";
import box8 from "../assets/tiles/8.jpg";
import box9 from "../assets/tiles/9.jpg";
import locked from "../assets/tiles/locked.png";
import unlocked from "../assets/tiles/unlocked.png";
import { Direction, Player } from './Player';
import { GridPhysics } from './GridPhysics';
import { GridControls } from './GridControl';
import { mintNFT } from "./../components/App.jsx";
const SYMBOLS = {
  ADD:'+',
  MINUS:'-',
  MULTIPLY:'*',
  DIVIDE:'/'
}

const GAME_DATA = [
  {
    numbers:[2,3],
    answer:5,
    symbol: SYMBOLS.ADD,
    pos:[{x:50,y:305},{x:272,y:110}],
    nft: ["Levelica 1", "This NFT has been awarded for completion of first level", "https://i.imgur.com/M2N57Qm.jpg"]
  },
  {
    numbers:[6,8,9],
    answer:95,
    symbol: SYMBOLS.ADD,
    pos:[{x:210,y:270},{x:335,y:50},{x:528,y:142}],
    nft: ["Levelica 2", "This NFT has been awarded for completion of second level", "https://i.imgur.com/M2N57Qm.jpg"]
  },
  {
    numbers:[9,9],
    answer:0,
    symbol: SYMBOLS.MINUS,
    pos:[{x:242,y:238},{x:430,y:110}],
    nft: ["Levelica 3", "This NFT has been awarded for completion of third level", "https://i.imgur.com/M2N57Qm.jpg"]
  }
]

const TYPES={
  SYMBOL:'symbol',
  BOX:'number'
}
class playGame extends Phaser.Scene {
  previousDirection = null;
  colliders=[];
  boxes=[];
  static TILE_SIZE = 32;
  player;
  cursors;
  expressionText;
  playerGroup;
  gridPhysics;
  gridControls;
  lock;
queue=[];

    constructor() {
        super({
            key: 'PlayGame'
        });
    }
  preload() {
    this.load.image('tiles', tiles);
        this.load.tilemapTiledJSON('dungeon', dungeon);
        this.load.image('addition', addition);
        this.load.image('minus', minus);
        this.load.image('0', box0);
        this.load.image('1', box1);
        this.load.image('2', box2);
        this.load.image('3', box3);
        this.load.image('4', box4);
        this.load.image('5', box5);
        this.load.image('6', box6);
        this.load.image('7', box7);
        this.load.image('8', box8);
        this.load.image('9', box9);
        this.load.image('locked', locked);
        this.load.image('unlocked', unlocked);
  }
 async create() {
    let map = this.make.tilemap({ key: 'dungeon' });
    let tileset = map.addTilesetImage('dungeon', 'tiles');
    let layer = map.createLayer(0, tileset, 0, 0);
    map.createLayer(1, tileset, 0, 0);
    layer.setCollisionByProperty({ collides: true });

    this.addExpressionBar();
    for(let i=0 ;i< GAME_DATA.length;i++){
      this.cleanup();
      this.playerGroup = this.add.container(0, 0);
      let yPos = GAME_DATA[i].symbol===SYMBOLS.ADD? 30:20;
      this.player = this.physics.add.sprite(0,0, GAME_DATA[i].symbol===SYMBOLS.ADD?"addition":"minus");
      this.player.setData("value",GAME_DATA[i].symbol);
      this.player.setData("type",TYPES.SYMBOL);
      this.queue.push(this.player);
      this.addSpriteToContainer(this.player);
      
    this.createBoxes(GAME_DATA[i]);

    
    this.physics.world.enable(this.playerGroup);
    
    this.cursors = this.input.keyboard.createCursorKeys();
    
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.playerGroup, false);
    
    const player = new Player(this.playerGroup, new Phaser.Math.Vector2(3, 5));
    
    this.gridPhysics = new GridPhysics(player, map);
    this.gridControls = new GridControls(this.input, this.gridPhysics);
    await this.createAndUnLock(GAME_DATA[i]);

  }
  this.showGameComplete();
  }

  showGameComplete() {
    var style = {
      font: "bold 16px Arial", fill: "#fff",
      boundsAlignH: "center", boundsAlignV: "middle"
    };
    this.add.text(this.cameras.main.centerX / 2, this.cameras.main.centerY / 2, 'You are a champion! \n Game Completed! ', style);
  }

  cleanup() {
    if (this.player) {
      this.player.destroy();
    }
    if (this.playerGroup) {
      this.playerGroup.destroy();
    }
    if(this.lock){
      this.lock.destroy();
    }
    this.expressionText.setText('');
    this.queue=[];
    this.boxes.forEach(box=>box.destroy());
  }

   createAndUnLock(answer) {
    return new Promise((resolve)=>{
      this.anims.create({
        key: 'unlock',
        frames: [
            { key: 'locked' },
            { key: 'unlocked' },
        ],
        frameRate: 10,
    });
    let xPos = 495,yPos=270;
    var style = { font: "bold 16px Arial", fill: "#000", 
    boundsAlignH: "center", boundsAlignV: "middle" };
    this.lock= this.physics.add.sprite(xPos, yPos, 'locked').setScale(0.3);
    this.add.rectangle(xPos, yPos+10, 20, 20, Phaser.Display.Color.HexStringToColor('#fff').color).setAlpha(1);
    this.add.text(xPos,yPos,answer.answer,style).setOrigin(0.5,0);
    let collider = this.physics.add.collider(this.playerGroup, this.lock, (e, _lock)=>{
      let exp = this.queue.reduce((a,b)=>a+b.getData("value"),''),ans=0;
      try{
        ans = eval(exp);
      }catch(e){

      }
      if(ans === answer.answer){
       _lock.play("unlock");
      collider.destroy();
      this.expressionText.setText("Won a NFT!");
      mintNFT(answer.nft[0], answer.nft[1], answer.nft[2]);
      setTimeout(()=>{
        return resolve();
      },2000);
    }
    });
    });
  }

  createBoxes(levelData) {
    for (let i = 0; i < levelData.numbers.length; i++) {
      let xPos = levelData.pos[i].x;
      let yPos = levelData.pos[i].y;
      this.boxes[i] = this.physics.add.sprite(xPos, yPos, `${levelData.numbers[i]}`);
      this.boxes[i].setData("value", levelData.numbers[i]);
      this.boxes[i].setData("type",TYPES.BOX);
    }
    let idx=0;
    for(let i=0;i<levelData.numbers.length;i++){
      for(let j=i+1;j<levelData.numbers.length;j++){
        this.colliders[idx] =
         this.physics.add.collider(this.boxes[i], this.boxes[j], this.onCollision.bind(this, this.boxes[j],this.boxes[i],idx));
        idx++;
      }
      this.colliders[idx]= this.physics.add.collider(this.player, this.boxes[i], this.onCollision.bind(this, this.boxes[i],this.player,idx));
        idx++;
    }
  }

  addExpressionBar(){
    this.add.rectangle(300, 350, 248, 58, 0x9966ff).setAlpha(0.5);
    this.add.rectangle(300, 350, 228, 38, 0xefc53f).setAlpha(0.7);

    var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    this.expressionText = this.add.text(300, 350, "", style);
    this.expressionText.setOrigin(0.5,0.5);
    this.expressionText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
  }

  setExpressionText(text){
    try {
      let ans = eval(text);
      text+= ` = ${ans}`;
    } catch (error) {
      text=text;
    }
    this.expressionText.setText(text);
  }

  addSpriteToContainer(sprite){
    sprite.setOrigin(0.5,1);
    this.playerGroup.add(sprite);
    this.playerGroup.setSize(this.playerGroup.width + sprite.width, this.playerGroup.height + sprite.height);
  }
  onCollision(obj1,obj2,index) {
    this.addSpriteToContainer(obj1);
    let xPos, yPos;
    let idx= this.queue.findIndex(item=>item.getData("value")===obj2.getData("value"));
    if (this.previousDirection === Direction.LEFT) {
        xPos = obj2.x - playGame.TILE_SIZE;
        yPos = obj2.y;
        if(obj1.getData("type")===TYPES.BOX){
          this.queue.splice(idx, 0, obj1);
        }
    } else if (this.previousDirection === Direction.RIGHT) {
        xPos = obj2.x + playGame.TILE_SIZE;
        yPos = obj2.y;
        if(obj1.getData("type")===TYPES.BOX){
          this.queue.splice(idx+1, 0, obj1);
        }
    } else if (this.previousDirection === Direction.UP) {
        xPos = obj2.x;
        yPos = obj2.y - playGame.TILE_SIZE;
        if(obj1.getData("type")===TYPES.BOX){
          this.queue.splice(idx, 0, obj1);
        }
    } else if (this.previousDirection === Direction.DOWN) {
        xPos = obj2.x;
        yPos = obj2.y + playGame.TILE_SIZE;
        if(obj1.getData("type")===TYPES.BOX){
          this.queue.splice(idx+1, 0, obj1);
        }
    }
    let exp = this.queue.reduce((a,b)=>a+b.getData("value"),'');
    this.setExpressionText(exp);
    obj1.setPosition(xPos, yPos);
    this.physics.world.removeCollider(this.colliders[index]);
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
