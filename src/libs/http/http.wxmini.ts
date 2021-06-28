import {httpInterface} from "../../utils/interfaces";

/**
 * 微信小程序 网络请求类
 */
export default class HttpWxMini implements httpInterface {

  send(url: string, data: any, method: string = 'post', header: any) {
    // @ts-ignore
    wx.request({
      url,
      method,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      }
    })

  }
}
