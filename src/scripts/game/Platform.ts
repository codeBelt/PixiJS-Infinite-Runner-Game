import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { App } from '../../main.ts';
import { Diamond } from './Diamond';
import { Config } from './Config.ts';

export class Platform {
  container;
  diamonds = [];
  body;
  tileSize;
  width;
  height;

  constructor(rows, cols, x) {
    this.rows = rows;
    this.cols = cols;

    this.tileSize = PIXI.Texture.from('tile').width;
    this.width = this.tileSize * this.cols;
    this.height = this.tileSize * this.rows;

    this.createContainer(x);
    this.createTiles();

    this.dx = Config.platforms.moveSpeed;
    this.createBody();
    this.createDiamonds();
  }

  createDiamonds() {
    const y = Config.diamonds.offset.min + Math.random() * (Config.diamonds.offset.max - Config.diamonds.offset.min);

    for (let i = 0; i < this.cols; i++) {
      if (Math.random() < Config.diamonds.chance) {
        this.createDiamond(this.tileSize * i, -y);
      }
    }
  }

  createDiamond(x, y) {
    const diamond = new Diamond(x, y);
    this.container.addChild(diamond.sprite);
    diamond.createBody();
    this.diamonds.push(diamond);
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      this.width / 2 + this.container.x,
      this.height / 2 + this.container.y,
      this.width,
      this.height,
      { friction: 0, isStatic: true }
    );
    Matter.World.add(App.physics.world, this.body);
    this.body.gamePlatform = this;
  }

  createContainer(x) {
    this.container = new PIXI.Container();
    this.container.x = x;
    this.container.y = window.innerHeight - this.height;
  }

  createTiles() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.createTile(row, col);
      }
    }
  }

  createTile(row, col) {
    //
    const texture = row === 0 ? 'platform' : 'tile';
    const tile = App.sprite(texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }

  move() {
    if (this.body) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x + this.dx,
        y: this.body.position.y,
      });
      this.container.x = this.body.position.x - this.width / 2;
      this.container.y = this.body.position.y - this.height / 2;
    }
  }

  destroy() {
    Matter.World.remove(App.physics.world, this.body);
    this.diamonds.forEach((diamond) => diamond.destroy());
    this.container.destroy();
  }
}
