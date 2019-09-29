import Layer from './Layer'
const GRAPHICS = Symbol('graphics');

class Graphics {
  list = [];

  push(eventName, arg = []) {
    this.list.push([eventName, arg]);
  }

  draw(ctx) {
    for (let i = 0; i < this.list.length; i++) {
      let [event, arg] = this.list[i];
      ctx[event](...arg)
    }
  }
}

export default class Sprite extends Layer {
  [GRAPHICS] = new Graphics;
  showdow = [0, 0, 0, '#000'];
  constructor(data) {
    super()
    Object.assign(this, data);
  }

  get graphics() {
    let _graphics = this[GRAPHICS];
    let that = this;
    return {
      beginFill(color) {
        _graphics.push('beginPath');
        _graphics.push('setFillStyle', [color])
      },
      clear() {
        _graphics.list = [];
      },
      bezierCurveTo(...arg) {
        _graphics.push('bezierCurveTo', arg);
      },
      quadraticCurveTo(...arg) {
        _graphics.push('quadraticCurveTo', arg);
      },
      arc(...arg) {
        _graphics.push('arc', arg);
      },
      rect(arg) {
        if (arg[4]) {
          let [x, y, w, h, r] = arg;
          if (typeof(r) == 'number') r = [r, r, r, r];
          ((r) => {
            _graphics.push('moveTo', [x + r, y]);
            _graphics.push('lineTo', [x + w - r, y])
            _graphics.push('lineTo', [x + w, y + r])
            _graphics.push('arc', [x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2])
          })(r[1]);

          ((r) => {
            _graphics.push('lineTo', [x + w, y + h - r])
            _graphics.push('lineTo', [x + w - r, y + h])
            _graphics.push('arc', [x + w - r, y + h - r, r, 0, Math.PI * 0.5])
          })(r[2]);

          ((r) => {
            _graphics.push('lineTo', [x + r, y + h])
            _graphics.push('lineTo', [x, y + h - r])
            _graphics.push('arc', [x + r, y + h - r, r, Math.PI * 0.5, Math.PI])
          })(r[3]);

          ((r) => {
            _graphics.push('lineTo', [x, y + r])
            _graphics.push('lineTo', [x + r, y])
            _graphics.push('arc', [x + r, y + r, r, Math.PI, Math.PI * 1.5])
          })(r[0]);
        } else {
          _graphics.push('rect', arg);
        }
      },
      lineStyle() {
        // width, color
      },
      lineTo(...arg) {
        _graphics.push('lineTo', arg);
      },
      moveTo(...arg) {
        _graphics.push('moveTo', arg);
      },
      endFill() {
        _graphics.push('fill');
        // _graphics.push('stroke');
      }
    }
  }

  draw() {
    let ctx = this.ctx;
    ctx.save()
    super.draw();
    this[GRAPHICS].draw(ctx);
    ctx.restore()
  }
}