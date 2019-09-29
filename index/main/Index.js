import Image from './Image';
import Layer from './Layer';
import Text from './Text';
import Sprite from './Sprite';
export {
  Image,
  Layer,
  Text,
  Sprite
};

export default class CanvasImage {
  ctx = null
  stageList = []
  constructor(ctx) {
    this.ctx = ctx
  }
  addText(data) {
    let label = new Text(data);
    this.addChild(label);
    return label;
  }
  addRect(...props) {
    let {
      rect,
      color,
      ...data
    } = props[0];
    if (props.length > 1) {
      let shadow;
      [color, rect, shadow] = props;
      data = {
        shadow
      }
    }
    let sprite = new Sprite(data);
    sprite.graphics.beginFill(color);
    sprite.graphics.rect(rect);
    sprite.graphics.endFill();
    this.addChild(sprite);
    return sprite;
  }
  addImage(...props) {
    let data = props[0];
    if (props.length > 1) {
      let [source, x, y, width, height, rect] = props;
      data = {
        source,
        x,
        y,
        width,
        height,
        rect
      }
    }
    if (data.source) {
      let image = new Image(data);
      this.addChild(image);
      return image
    }
    return
  }

  // 加载图片资源
  loadImages(...urls) {
    return urls.map((item) => {
      return new Promise((resolve) => {
        wx.getImageInfo({
          src: item,
          success(res) {
            if (!(/^http/.test(res.path))) {
              res.path = '/' + res.path
            }
            resolve(res);
          },
          fail() {
            resolve();
          }
        })
      })
    });
  }
  addChild(layer) {
    layer.ctx = this.ctx;
    this.stageList.push(layer);
  }

  getImage(data, target) {
    return new Promise(function(resolve) {
      wx.canvasToTempFilePath({
        ...data,
        success(res) {
          resolve([, res.tempFilePath])
        },
        fail(err) {
          resolve(err);
        }
      }, target)
    });
  }

  draw(bool = true, ...arg) {
    let list = [...this.stageList].sort((prev, next) => prev.zIndex - next.zIndex);
    list.map((item) => {
      item.draw(this.ctx);
    })
    return new Promise((resolve) => {
      this.ctx.draw(bool, () => {
        setTimeout(() => {
          if (arg.length) {
            resolve(this.getImage(...arg))
          } else {
            resolve([]);
          }
        }, 30)
      });
    })
  }
}