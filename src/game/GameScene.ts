import Matter from 'matter-js';
import { LabelScore } from './LabelScore.ts';
import { App } from '../main.ts';
import { Background } from './Background.ts';
import { Scene } from '../system/Scene.ts';
import { Hero } from './Hero.ts';
import { Platforms } from './Platforms.ts';

export class GameScene extends Scene {
  // hero;
  // labelScore: LabelScore;
  // platfroms;
  // bg;

  constructor() {
    super();
  }

  create() {
    this._createBackground();
    this._createHero();
    this._createPlatforms();
    this._setEvents();
    this._createUI();
  }

  update(dt): void {
    this.bg.update(dt);
    this.platfroms.update(dt);
  }

  destroy(): void {
    console.log(`destroy`);
    Matter.Events.off(App.physics, 'collisionStart', this.bind);
    App.app.ticker.remove(this.update, this);
    this.bg.destroy();
    this.hero.destroy();
    this.platfroms.destroy();
    this.labelScore.destroy();
  }

  private _createUI(): void {
    this.labelScore = new LabelScore();
    this.container.addChild(this.labelScore);
    this.hero.sprite.on('score', () => {
      this.labelScore.renderScore(this.hero.score);
    });
  }

  private _setEvents(): void {
    this.bind = this._onCollisionStart.bind(this);
    Matter.Events.on(App.physics, 'collisionStart', this.bind);
  }

  private _onCollisionStart(event): void {
    console.log(`event`, event);
    console.log(`this`, this);
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.gamePlatform);

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform);
    }

    const diamond = colliders.find((body) => body.gameDiamond);

    if (hero && diamond) {
      this.hero.collectDiamond(diamond.gameDiamond);
    }
  }

  private _createHero(): void {
    this.hero = new Hero();
    this.container.addChild(this.hero.sprite);

    this.container.interactive = true;
    this.container.on('pointerdown', () => {
      this.hero.startJump();
    });

    this.hero.sprite.once('die', () => {
      App.scenesManager.start('Game');
    });
  }

  private _createBackground(): void {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  private _createPlatforms(): void {
    this.platfroms = new Platforms();
    this.container.addChild(this.platfroms.container);
  }
}
