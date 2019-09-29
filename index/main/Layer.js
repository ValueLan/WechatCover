export default class Layer {
  zIndex = 0
  opacity = 1;
  ctx = null
  mask = null
  shadow = null;
  constructor() {}
  draw() {
    this.ctx.setGlobalAlpha(this.opacity);
    this.drawShadow()
    this.drawMask();
  }
  drawMask() {
    if (this.mask) {
      // clip todo
    }
  }
  drawShadow() {
    if (this.shadow) {
      this.ctx.setShadow(...this.shadow)
    } else {
      this.ctx.setShadow(0, 0, 0, '#000');
    }
  }
}