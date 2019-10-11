import Layer from './Layer'
const LINE = Symbol('line');
export default class Text extends Layer {
  label = ''
  color = '#000';
  textAlign = 'left'
  width = null;
  x = 0;
  y = 0;
  lineHeight = 30;
  fontStyle = ''
  fontSize = '';
  fontWeight = '';
  fontFamily = '';
  row = 1;
  [LINE] = 0;
  get line() {
    return this[LINE];
  }
  constructor(data) {
    super();
    Object.assign(this, data);
  }
  drawText(isMeasure = false) {
    let ctx = this.ctx;
    ctx.save();
    super.draw();
    let font = ['normal', 'normal', '12px', 'Arial,Microsoft Yahei'];
    let label = this.label.replace(/[\r\n]/g, '');
    if (this.fontStyle) font[0] = this.fontStyle;
    if (this.fontWeight) font[1] = this.fontWeight;
    if (this.fontSize) {
      font[2] = typeof this.fontSize == 'number' ? this.fontSize + 'px' : this.fontSize;
    }
    if (this.fontFamily) font[3] = this.fontFamily;
    ctx.font = font.join(' ');
    ctx.setFillStyle(this.color);
    ctx.setTextAlign(this.textAlign);
    let nowWidth = 0;
    let lastSubStrIndex = 0;
    let lineHeight = this.lineHeight;
    let initY = this.y + lineHeight;
    let line = 0;
    let maxWidth = 0;
    for (let i = 0; i < label.length; i++) {
      nowWidth = ctx.measureText(label.substring(lastSubStrIndex, i)).width;
      if (nowWidth > this.width) {
        line++
        let str = label.substring(lastSubStrIndex, i - 1)
        if (this.row == line) {
          str = label.substring(lastSubStrIndex, i - 2) + '…'
        }
        maxWidth = Math.max(ctx.measureText(str).width, maxWidth);
        if (!isMeasure) ctx.fillText(str, this.x, initY);
        initY += lineHeight;
        nowWidth = 0;
        lastSubStrIndex = i - 1;
        if (this.row == line) break;
      }
      if (i == label.length - 1) {
        let str = label.substring(lastSubStrIndex, i + 1)
        maxWidth = Math.max(ctx.measureText(str).width, maxWidth);
        if (!isMeasure) ctx.fillText(str, this.x, initY);
        line++;
      }
    }
    ctx.restore();
    this[LINE] = line;
    return {
      width: maxWidth,
      line,
      height: line * lineHeight
    }
  }
  measureText() {
    return this.drawText(true)
  }
  draw() {
    return this.drawText()
  }
}