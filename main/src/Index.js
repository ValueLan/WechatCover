import Image from './Image';
import Layer from './Layer';
import Text from './Text';
import Sprite from './Sprite';
import Shape from './Shape';

export {
  Image,
  Layer,
  Text,
  Sprite,
  Shape
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
      ...data
    } = props[0];
    if (props.length > 1) {
      let shadow, color;
      [color, rect, shadow] = props;
      data = {
        color,
        shadow
      }
    }

    let sprite = new Sprite(data);
    sprite.graphics.rect(...rect);
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
    if (!data.source[0] && data.source[1]) {
      data.source = data.source[1];
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
        if (item == '') return resolve([{
          errMsg: 'url地址为空'
        }]);
        wx.getImageInfo({
          src: item,
          success(res) {
            if (res.path.indexOf("://") == -1) {
              res.path = '/' + res.path
            }
            resolve([, res]);
          },
          fail(err) {
            resolve([err]);
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
          resolve([err]);
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