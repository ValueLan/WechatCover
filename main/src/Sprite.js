import Layer from './Layer'
import Shape from './Shape'
const GRAPHICS = Symbol('graphics');

export default class Sprite extends Layer {
  [GRAPHICS] = null;
  color = '#000';

  get graphics() {
    return this[GRAPHICS];
  }

  constructor({
    shape,
    ...data
  }) {
    super()
    if (shape) {
      this[GRAPHICS] = shape;
    } else {
      this[GRAPHICS] = new Shape();
    }
    Object.assign(this, data);
  }

  draw() {
    let ctx = this.ctx;
    super.draw();
    ctx.save()
    ctx.beginPath()
    ctx.setFillStyle(this.color)
    this[GRAPHICS].draw(ctx);
    ctx.fill();
    ctx.restore()
  }
}