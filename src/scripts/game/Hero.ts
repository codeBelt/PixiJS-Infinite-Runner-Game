import Matter from 'matter-js';
import { App } from '../../main.ts';
import { Config } from './Config.ts';
import { Platform } from './Platform.ts';
import { Diamond } from './Diamond.ts';
import { AnimatedSprite } from 'pixi.js';

export class Hero {
  maxJumps: number = Config.hero.maxJumps;
  score: number = 0;
  private _dy: number = Config.hero.jumpSpeed;
  private _jumpIndex: number = 0;
  private _platform: Platform | null = null;
  sprite: AnimatedSprite = new AnimatedSprite([App.res('walk1'), App.res('walk2')]);
  body: Matter.Body;

  constructor() {
    this._createSprite();
    this._createBody();

    App.app.ticker.add(this.update, this);
  }

  collectDiamond(diamond: Diamond): void {
    ++this.score;
    this.sprite.emit('score');
    diamond.destroy();
  }

  startJump(): void {
    if (this._platform || this._jumpIndex === 1) {
      ++this._jumpIndex;
      this._platform = null;
      Matter.Body.setVelocity(this.body, { x: 0, y: -this._dy });
    }
  }

  stayOnPlatform(platform: Platform): void {
    this._platform = platform;
    this._jumpIndex = 0;
  }

  update(): void {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;

    if (this.sprite.y > window.innerHeight) {
      this.sprite.emit('die');
    }
  }

  destroy(): void {
    App.app.ticker.remove(this.update, this);
    Matter.World.add(App.physics.world, this.body);
    this.sprite.destroy();
  }

  private _createSprite(): void {
    this.sprite.x = Config.hero.position.x;
    this.sprite.y = Config.hero.position.y;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
  }

  private _createBody(): void {
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0 }
    );
    Matter.World.add(App.physics.world, this.body);
    this.body.gameHero = this;
  }
}
