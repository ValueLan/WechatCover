import CanvasImage, {
  Shape
} from '../src/Index';

Page({
  data: {
    src: ''
  },
  async getImage() {
    let [err, res] = await CanvasImage.saveImage(this.data.src);
    if (err) {
      wx.showToast({
        title: '失败',
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '成功',
        icon: 'none'
      })
    }
  },
  async onLoad(options) {
    var ctx = wx.createCanvasContext('customCanvas');
    const canvasCtx = new CanvasImage(ctx);
    wx.showLoading({
      title: '图片生成中',
    })

    let [bg, icon, avatar, wxCode] = await CanvasImage.loadImages('./images/bg.png', './images/data2@2x.png', './images/132.png', './images/wx.jpg')

    canvasCtx.addRect({
      color: '#eee',
      rect: [20, 20, 335, 600, 10],
      shadow: [0, 0, 10, 'rgba(0,0,0,0.5)']
    })
    canvasCtx.addRect('pink', [30, 30, 305, 600, this.randRange(0, 50)], [0, 0, 10, 'blue']);
    canvasCtx.addImage({
      source: icon,
      x: 40,
      y: 30,
      width: 40,
      height: 40,
      zIndex: 9
    })

    canvasCtx.addImage({
      source: icon,
      x: 280,
      y: 30,
      width: 40,
      height: 40,
      zIndex: 9
    });

    canvasCtx.addImage({
      source: avatar,
      shadow: [0, 0, 10, 'rgba(20, 20, 20, 0.5)'],
      backgroundColor: '#fff',
      mask: Shape.arc(140, 10, 30, 0, 2 * Math.PI),
      x: 140,
      y: 10,
      width: 60,
      height: 60,
      zIndex: 999
    });

    canvasCtx.addImage({
      source: wxCode,
      x: 40,
      y: 110,
      width: 280,
      height: 280
    });

    let text = canvasCtx.addText({
      label: '随着APP市场的饱和，大部分用户已经养成了使用习惯，开发新的APP很难在市场生存。此外，APP开发和推广成本高也是不争的事实。易观2018年3月份的报告显示，移动电商APP的下载成本高达120-200 元，而且这些后期未必能形成转化。互联网金融、二手车电商APP的新客户成本，更是动辄高达数千元。',
      width: 255,
      x: 55,
      y: 400,
      row: this.randRange(3, 10),
      lineHeight: 22,
      color: '#FFF',
      fontSize: 13,
      // fontStyle: 'italic',
      fontWeight: 'bold',
      zIndex: 99
    })

    canvasCtx.addImage({
      source: bg,
      width: 280,
      height: text.measureText().height + 10,
      x: 40,
      y: 400,
      rect: [0, 12, 300, 20]
    })

    let [err, src] = await canvasCtx.draw(true, {
      canvasId: 'customCanvas',
    });
    wx.hideLoading();
    this.setData({
      src
    })
    console.log('生成Image地址', src);
  },
  randRange(start, end) {
    return parseInt(Math.random() * (1 + end - start) + start)
  }
})