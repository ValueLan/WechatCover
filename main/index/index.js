import CanvasImage, {
  Shape
} from '../src/Index';

Page({
  data: {},
  async onLoad(options) {
    var ctx = wx.createCanvasContext('customCanvas');
    const canvasCtx = new CanvasImage(ctx);

    let listPromise = canvasCtx.loadImages('./images/bg.png', './images/data2@2x.png', 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKPpoWTDzhIakEEViaoRkGd3DuHSlUeiap4EYhDlricqj4GZ7icS9gzd21JL9lRVMS1IV9oZmic32k6cWQ/132');
    wx.showLoading({
      title: '图片生成中',
    })
    let [bg, icon, avatar] = await Promise.all(listPromise)
    canvasCtx.addRect({
      color: '#eee',
      rect: [20, 20, 335, 600, 10],
      shadow: [0, 0, 10, 'rgba(0,0,0,0.5)']
    })
    canvasCtx.addImage({
      source: icon,
      x: 40,
      y: 30,
      zIndex: 9
    })

    canvasCtx.addImage({
      source: icon,
      x: 40,
      y: 80,
      width: 60,
      height: 60,
      zIndex: 9
    });


    canvasCtx.addImage({
      source: avatar,
      shadow: [0, 0, 10, 'rgba(0, 0, 0, 0.2)'],
      backgroundColor: '#fff',
      mask: Shape.arc(140, 80, 30, 0, 2 * Math.PI),
      x: 140,
      y: 80,
      width: 60,
      height: 60
    })

    let text = canvasCtx.addText({
      label: '随着APP市场的饱和，大部分用户已经养成了使用习惯，开发新的APP很难在市场生存。此外，APP开发和推广成本高也是不争的事实。易观2018年3月份的报告显示，移动电商APP的下载成本高达120-200 元，而且这些后期未必能形成转化。互联网金融、二手车电商APP的新客户成本，更是动辄高达数千元。',
      width: 260,
      x: 55,
      y: 300,
      row: this.randRange(3, 10),
      lineHeight: 22,
      color: '#FFF',
      fontSize: '13px',
      // fontStyle: 'italic',
      fontWeight: 'bold',
      zIndex: 99
    })

    canvasCtx.addImage({
      source: bg,
      width: 300,
      height: text.measureText().height + 10,
      x: 40,
      y: 300,
      rect: [0, 12, 300, 20]
    })
    canvasCtx.addRect('pink', [40, 160, 100, 100, this.randRange(0, 50)], [0, 0, 10, 'blue']);

    let [err, res] = await canvasCtx.draw(true, {
      x: 0,
      y: 0,
      width: 375,
      height: 750,
      canvasId: 'customCanvas',
    });

    wx.hideLoading();
    console.log('生成Image地址', res);
  },
  randRange(start, end) {
    return parseInt(Math.random() * (1 + end - start) + start)
  }
})