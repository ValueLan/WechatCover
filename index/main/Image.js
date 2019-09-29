import Layer from './Layer'
export default class Image extends Layer {
  source = null
  rect = null // [x,y,w,h]
  width = null
  height = null
  maxWidth = 0;
  maxHeight = 0;
  x = 0
  y = 0
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  draw() {
    let ctx = this.ctx;
    ctx.save()
    super.draw();
    let width = this.width || this.source.width;
    let height = this.height || this.source.height;
    if (this.rect) {
      let [rectX, rectY, rectW, rectH] = this.rect;
      let point = [];
      for (let i = 1; i <= 9; i++) {
        let sw, sh, sx, sy,
          dx, dy, dw, dh;
        if (i <= 3) {
          dh = sh = rectY;
          dy = sy = 0;
        } else if (i <= 6) {
          sh = rectH;
          dy = sy = rectY;
          dh = height - rectY - (this.source.height - rectH - rectY)
        } else {
          dh = sh = (this.source.height - rectH - rectY); // 底部高度
          sy = rectH + rectY;
          dy = height - (this.source.height - rectH - rectY);
        }
        if (i % 3 == 1) {
          dw = sw = rectX;
          dx = sx = 0;
        } else if (i % 3 == 2) {
          sw = rectW;
          dx = sx = rectX;
          dw = width - rectX - (this.source.width - rectW - rectX);
        } else {
          dw = sw = this.source.width - rectW - rectX; // 右边宽度
          sx = rectW + rectX;
          dx = width - (this.source.width - rectW - rectX);
        }
        ctx.drawImage(this.source.path, sx, sy, sw, sh, dx + this.x, dy + this.y, dw, dh)
      }
    } else {
      let {
        x,
        y
      } = this;

      if (this.maxWidth && width > this.maxWidth) {
        width = this.maxWidth;
        height = parseInt(this.maxWidth * this.source.height / this.source.width);
      }

      if (this.maxHeight && height > this.maxHeight) {
        height = this.maxHeight;
        width = parseInt(this.maxHeight * this.source.width / this.source.height);
      }

      if (this.maxWidth) {
        y = this.y - (height - this.maxWidth) / 2;
      }

      if (this.maxHeight) {
        x = this.x - (width - this.maxHeight) / 2;
      }

      ctx.drawImage(this.source.path, x, y, width, height)
    }
    ctx.restore();
    return this;
  }
}