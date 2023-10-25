import Matter, { Body } from 'matter-js';
import { App } from '../main.ts';
import { Diamond } from './Diamond.ts';
import { Config } from './Config.ts';
import { Container, Texture } from 'pixi.js';

export class Platform {
  container: Container;
  private _body: Body | null = null;
  private _diamonds: Diamond[] = [];
  private _dx: number = Config.platforms.moveSpeed;
  private readonly _cols: number;
  private readonly _height: number;
  private readonly _rows: number;
  private readonly _tileSize: number;
  private readonly _width: number;

  constructor(rows: number, cols: number, x: number) {
    this._rows = rows;
    this._cols = cols;
    this._tileSize = Texture.from('tile').width;
    this._width = this._tileSize * this._cols;
    this._height = this._tileSize * this._rows;

    this._createContainer(x);
    this._createTiles();
    this._createBody();
    this._createDiamonds();
  }

  move(): void {
    if (this._body) {
      Matter.Body.setPosition(this._body, {
        x: this._body.position.x + this._dx,
        y: this._body.position.y,
      });
      this.container.x = this._body.position.x - this._width / 2;
      this.container.y = this._body.position.y - this._height / 2;
    }
  }

  destroy(): void {
    Matter.World.remove(App.physics.world, this._body);
    this._diamonds.forEach((diamond) => diamond.destroy());
    this.container.destroy();
  }

  private _createDiamonds(): void {
    const y = Config.diamonds.offset.min + Math.random() * (Config.diamonds.offset.max - Config.diamonds.offset.min);

    for (let i = 0; i < this._cols; i++) {
      if (Math.random() < Config.diamonds.chance) {
        this._createDiamond(this._tileSize * i, -y);
      }
    }
  }

  private _createDiamond(x: number, y: number): void {
    const diamond = new Diamond(x, y);
    this.container.addChild(diamond.sprite);
    diamond.createBody();
    this._diamonds.push(diamond);
  }

  private _createBody(): void {
    this._body = Matter.Bodies.rectangle(
      this._width / 2 + this.container.x,
      this._height / 2 + this.container.y,
      this._width,
      this._height,
      { friction: 0, isStatic: true }
    );
    Matter.World.add(App.physics.world, this._body);
    this._body.gamePlatform = this;
  }

  private _createContainer(x: number): void {
    this.container = new Container();
    this.container.x = x;
    this.container.y = window.innerHeight - this._height;
  }

  private _createTiles(): void {
    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._cols; col++) {
        this._createTile(row, col);
      }
    }
  }

  private _createTile(row: number, col: number): void {
    const texture = row === 0 ? 'platform' : 'tile';
    const tile = App.sprite(texture);
    this.container.addChild(tile);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
  }
}
