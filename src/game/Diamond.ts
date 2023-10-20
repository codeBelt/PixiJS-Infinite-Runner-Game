import Matter, { Body } from 'matter-js';
import { App } from '../main.ts';
import { Sprite } from 'pixi.js';

export class Diamond {
  body: Body | null = null;
  sprite: Sprite = App.sprite('diamond');

  constructor(x: number, y: number) {
    this.sprite.x = x;
    this.sprite.y = y;

    App.app.ticker.add(this.update, this);
  }

  createBody(): void {
    if (!this.sprite) {
      return;
    }

    this.body = Matter.Bodies.rectangle(
      this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
      this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true, render: { fillStyle: '#060a19' } }
    );
    this.body.isSensor = true;
    this.body.gameDiamond = this;

    Matter.World.add(App.physics.world, this.body);
  }

  update(): void {
    if (!this.sprite || !this.body) {
      return;
    }

    Matter.Body.setPosition(this.body, {
      x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
      y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y,
    });
  }

  destroy(): void {
    if (!this.sprite || !this.body) {
      return;
    }

    App.app.ticker.remove(this.update, this);
    Matter.World.remove(App.physics.world, this.body);

    this.sprite.destroy();
    this.sprite = null;
  }
}
