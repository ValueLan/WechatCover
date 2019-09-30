export default class Shape {
  static arc(...arg) {
    let shape = new Shape();
     shape.arc(...arg);
    return shape
  }
  static rect(...arg) {
    let shape = new Shape();
    shape.rect(...arg);
    return shape
  }
  ctx = null
  list = []
  constructor() {

  }

  draw(ctx) {
    if (ctx) this.ctx = ctx;
    if (!this.ctx) return;
    for (let i = 0; i < this.list.length; i++) {
      let [event, arg] = this.list[i];
      this.ctx[event](...arg)
    }
  }

  push(type, data) {
    this.list.push([type, data]);
  }

  clear() {
    this.list = [];
  }

  bezierCurveTo(...arg) {
    this.push('bezierCurveTo', arg);
  }

  quadraticCurveTo(...arg) {
    this.push('quadraticCurveTo', arg);
  }

  arc(...arg) {
    arg[0] += arg[2]
    arg[1] += arg[2]
    this.push('arc', arg);
  }

  rect(...arg) {
    if (arg[4]) {
      let [x, y, w, h, r] = arg;
      if (typeof(r) == 'number') r = [r, r, r, r];
      ((r) => {
        this.push('moveTo', [x + r, y]);
        this.push('lineTo', [x + w - r, y])
        this.push('lineTo', [x + w, y + r])
        this.push('arc', [x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2])
      })(r[1]);

      ((r) => {
        this.push('lineTo', [x + w, y + h - r])
        this.push('lineTo', [x + w - r, y + h])
        this.push('arc', [x + w - r, y + h - r, r, 0, Math.PI * 0.5])
      })(r[2]);

      ((r) => {
        this.push('lineTo', [x + r, y + h])
        this.push('lineTo', [x, y + h - r])
        this.push('arc', [x + r, y + h - r, r, Math.PI * 0.5, Math.PI])
      })(r[3]);

      ((r) => {
        this.push('lineTo', [x, y + r])
        this.push('lineTo', [x + r, y])
        this.push('arc', [x + r, y + r, r, Math.PI, Math.PI * 1.5])
      })(r[0]);
    } else {
      this.push('rect', arg);
    }
  }
  lineTo(...arg) {
    this.push('lineTo', arg);
  }
  moveTo(...arg) {
    this.push('moveTo', arg);
  }
}