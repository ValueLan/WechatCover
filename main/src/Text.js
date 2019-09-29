import Layer from './Layer'
const LINE = Symbol('line');
export default class Text extends Layer {
  label = ''
  color = '#000';
  textAlign = 'left'
  width = null;
  // height = null;
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
  measureText() {
    let font = ['normal', 'normal', '12px', 'Arial,Microsoft Yahei'];
    let label = this.label.replace(/[\r\n]/g, '');
    let ctx = this.ctx;
    ctx.save();
    if (this.fontStyle) font[0] = this.fontStyle;
    if (this.fontWeight) font[1] = this.fontWeight;
    if (this.fontSize) font[2] = this.fontSize;
    if (this.fontFamily) font[3] = this.fontFamily;
    ctx.font = font.join(' ');
    let nowWidth = 0;
    let lastSubStrIndex = 0;
    let lineHeight = this.lineHeight;
    let initY = this.y + lineHeight;
    let line = 0;
    let maxWidth = 0;
    for (let i = 0; i < label.length; i++) {
      nowWidth = ctx.measureText(label.substring(lastSubStrIndex, i)).width;
      if (nowWidth > this.width) {
        let str = label.substring(lastSubStrIndex, i - 1)
        maxWidth = Math.max(ctx.measureText(str).width, maxWidth);
        initY += lineHeight;
        nowWidth = 0;
        lastSubStrIndex = i - 1;
        line++
        if (this.row == line) break;
      }
      if (i == label.length - 1) {
        let str = label.substring(lastSubStrIndex, i + 1)
        maxWidth = Math.max(ctx.measureText(str).width, maxWidth);
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
  draw() {
    let ctx = this.ctx;
    ctx.save();
    super.draw();
    let font = ['normal', 'normal', '12px', 'Arial,Microsoft Yahei'];
    let label = this.label.replace(/[\r\n]/g, '');
    if (this.fontStyle) font[0] = this.fontStyle;
    if (this.fontWeight) font[1] = this.fontWeight;
    if (this.fontSize) font[2] = this.fontSize;
    if (this.fontFamily) font[3] = this.fontFamily;
    ctx.font = font.join(' ');
    ctx.setFillStyle(this.color);
    ctx.setTextAlign(this.textAlign);
    let nowWidth = 0;
    let lastSubStrIndex = 0;
    let lineHeight = this.lineHeight;
    let initY = this.y + lineHeight;
    let line = 0;
    for (let i = 0; i < label.length; i++) {
      nowWidth = ctx.measureText(label.substring(lastSubStrIndex, i)).width;
      if (nowWidth > this.width) {
        let str = label.substring(lastSubStrIndex, i - 1)
        ctx.fillText(str, this.x, initY);
        initY += lineHeight;
        nowWidth = 0;
        lastSubStrIndex = i - 1;
        line++
        if (this.row == line) break;
      }
      if (i == label.length - 1) {
        let str = label.substring(lastSubStrIndex, i + 1)
        ctx.fillText(str, this.x, initY);
        line++;
      }
    }
    ctx.restore();
    this[LINE] = line;
  }
}