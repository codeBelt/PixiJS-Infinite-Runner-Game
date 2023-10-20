import Matter from 'matter-js';
import * as PIXI from 'pixi.js';
import { Loader } from './Loader';
import { ScenesManager } from './ScenesManager';
import { Config } from '../game/Config.ts';
import { Sprite, Texture } from 'pixi.js';
import { GameScene } from '../game/GameScene.ts';

export class MainApplication {
  loader: Loader = new Loader();
  app: PIXI.Application = new PIXI.Application({ resizeTo: window });
  scenesManager: ScenesManager = new ScenesManager();
  physics: Matter.Engine;

  constructor() {}

  async run() {
    document.body.appendChild(this.app.view);

    this.loader.init().then(() => {
      console.log(`this`, this);
      this.start();
    });

    this.app.stage.interactive = true;
    this.app.stage.addChild(this.scenesManager.container);

    this.createPhysics();
  }

  createPhysics() {
    this.physics = Matter.Engine.create();
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
