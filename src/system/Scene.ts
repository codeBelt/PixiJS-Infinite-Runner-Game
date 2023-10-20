import { App } from '../main.ts';
import { Container } from 'pixi.js';

export abstract class Scene {
  container: Container = new Container();

  constructor() {
    this.container.interactive = true;

    this.create();

    App.app.ticker.add(this.update, this);
  }

  abstract create(): void;
  abstract update(): void;
  abstract destroy(): void;
}
