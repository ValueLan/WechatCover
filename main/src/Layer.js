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
      if (this.shadow) {
        this.ctx.beginPath();
        this.ctx.setFillStyle('rgba(0, 0, 0, 1)')
        this.mask.draw(this.ctx);
        this.ctx.setShadow(...this.shadow)
        this.ctx.fill();
        this.ctx.setShadow(0, 0, 0, '#000')
      }
      this.ctx.beginPath();
      this.mask.draw(this.ctx);
      this.ctx.clip();
    }
  }
  drawShadow() {
    if (this.mask && this.shadow) return;
    if (this.shadow) {
      this.ctx.setShadow(...this.shadow)
    } else {
      this.ctx.setShadow(0, 0, 0, '#000');
    }
  }
}