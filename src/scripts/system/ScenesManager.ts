import { App } from '../../main.ts';
import { Container } from 'pixi.js';
import { Scene } from './Scene.ts';
import { Constructor } from 'type-fest';
import { Config } from '../game/Config.ts';

export class ScenesManager {
  container: Container = new Container();
  scene: Scene | null = null;

  constructor() {
    this.container.interactive = true;
  }

  start(scene: string): void {
    if (this.scene) {
      this.scene.destroy();
    }

    this.scene = new Config.scenes[scene]();
    this.container.addChild(this.scene.container);
  }

  update(dt): void {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}
