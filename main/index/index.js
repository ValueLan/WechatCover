import CanvasImage, {
  Shape
} from '../src/Index';

function sleep(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  })
}
Page({
  data: {},
  async onLoad(options) {
    var ctx = wx.createCanvasContext('customCanvas');
    const canvasCtx = new CanvasImage(ctx);

    wx.showLoading({
      title: '图片生成中',
    })
    let listPromise = canvasCtx.loadImages('./images/bg.png', 'https://investtool-1254399226.cos.ap-guangzhou.myqcloud.com/image/xcx_image/share-active.png', 'https://thumbnail0.baidupcs.com/thumbnail/026b701d26abddbae641222027d172cf?fid=3204566640-250528-148873388924769&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-8WV6Ipd9anKM%2bw9gbwIaMkGgagc%3d&expires=8h&chkbd=0&chkv=0&dp-logid=6318377613468744130&dp-callid=0&time=1569808800&size=c1920_u1080&quality=90&vuk=3204566640&ft=image&autopolicy=1', 'https://thumbnail0.baidupcs.com/thumbnail/b27811ce9d4f4093b8832c0eb02fc7fe?fid=3204566640-250528-1028977197837789&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-sit7OKZdnlrFb0fxFPNiy0Ocu00%3d&expires=8h&chkbd=0&chkv=0&dp-logid=6317876651412206612&dp-callid=0&time=1569805200&size=c1920_u1080&quality=90&vuk=3204566640&ft=image&autopolicy=1');

    let [bg, icon, avatar, wxCode] = await Promise.all(listPromise)

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
      shadow: [0, 0, 10, 'rgba(0, 0, 0, 0.5)'],
      backgroundColor: '#fff',
      mask: Shape.arc(140, 10, 30, 0, 2 * Math.PI),
      x: 140,
      y: 10,
      width: 60,
      height: 60
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
      fontSize: '13px',
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