import { Config } from './Config.ts';
import { Text } from 'pixi.js';

export class LabelScore extends Text {
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
