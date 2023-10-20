import { App } from '../../main.ts';
import { Config } from './Config.ts';
import { Container, Sprite } from 'pixi.js';

export class Background {
  speed: number = Config.bgSpeed;
  container: Container = new Container();
  sprites: Sprite[] = [];

  constructor() {
    this.createSprites();
  }

  createSprites(): void {
    this.sprites = [];

    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  createSprite(i: number): void {
    const sprite = App.sprite('bg');

    sprite.x = sprite.width * i;
    sprite.y = 0;

    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite: Sprite, offset: number): void {
    const spriteRightX = sprite.x + sprite.width;

    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(dt): void {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  destroy(): void {
    this.container.destroy();
  }
}
