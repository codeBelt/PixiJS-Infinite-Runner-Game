import * as PIXI from 'pixi.js';
import { Config } from './Config.ts';

export class LabelScore extends PIXI.Text {
  constructor() {
    super();
    this.x = Config.score.x;
    this.y = Config.score.y;
    this.style = Config.score.style;
    this.anchor.set(Config.score.anchor);
    this.renderScore();
  }

  renderScore(score: number = 0): void {
    this.text = `Score: ${score}`;
  }
}
