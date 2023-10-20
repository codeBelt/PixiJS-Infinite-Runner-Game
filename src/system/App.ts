import Matter, { Engine } from 'matter-js';
import * as PIXI from 'pixi.js';
import { Loader } from './Loader.ts';
import { ScenesManager } from './ScenesManager.ts';
import { Sprite, Texture } from 'pixi.js';

export class MainApplication {
  loader: Loader = new Loader();
  app: PIXI.Application = new PIXI.Application({ resizeTo: window });
  scenesManager: ScenesManager = new ScenesManager();
  physics: Engine = Matter.Engine.create();

  constructor() {}

  async run() {
    document.body.appendChild(this.app.view);

    this.loader.init().then(() => {
      console.log(`this`, this);
      this.start();
    });

    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenesManager.container);

    this._createPhysics();
  }

  private _createPhysics() {
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
  }

  res(key: string): Texture {
    return this.loader.resources[key];
  }

  sprite(key: string): Sprite {
    return new Sprite(this.res(key));
  }

  start() {
    this.scenesManager.start('Game');
  }
}
