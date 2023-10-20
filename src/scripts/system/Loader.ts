import { Assets, Texture } from 'pixi.js';

export class Loader {
  resources: Record<string, Texture> = {};

  async init(): Promise<void> {
    await Assets.init({ manifest: 'assets/manifest.json' });

    this.resources = await Assets.loadBundle('game-screen');
  }
}
