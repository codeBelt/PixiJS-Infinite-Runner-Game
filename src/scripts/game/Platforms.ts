import { Platform } from './Platform';
import { Config } from './Config.ts';
import { Container } from 'pixi.js';

export interface IPlatformData {
  rows: number;
  cols: number;
  x: number;
}

export class Platforms {
  container: Container = new Container();
  private _platforms: Platform[] = [];
  private _current: Platform | null = null;
  private _ranges = Config.platforms.ranges;

  constructor() {
    this._createPlatform({ rows: 4, cols: 6, x: 200 });
  }

  private get _randomData() {
    let data = { rows: 0, cols: 0, x: 0 };

    const offset =
      this._ranges.offset.min + Math.round(Math.random() * (this._ranges.offset.max - this._ranges.offset.min));

    data.x = this._current.container.x + this._current.container.width + offset;
    data.cols = this._ranges.cols.min + Math.round(Math.random() * (this._ranges.cols.max - this._ranges.cols.min));
    data.rows = this._ranges.rows.min + Math.round(Math.random() * (this._ranges.rows.max - this._ranges.rows.min));

    return data;
  }

  update(): void {
    if (this._current.container.x + this._current.container.width < window.innerWidth) {
      this._createPlatform(this._randomData);
    }

    this._platforms.forEach((platform) => platform.move());
  }

  destroy(): void {
    this._platforms.forEach((platform) => platform.destroy());
    this.container.destroy();
  }

  private _createPlatform(data: IPlatformData): void {
    const platform = new Platform(data.rows, data.cols, data.x);
    this.container.addChild(platform.container);
    this._platforms.push(platform);
    this._current = platform;
  }
}
