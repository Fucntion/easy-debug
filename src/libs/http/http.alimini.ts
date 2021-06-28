import {httpInterface} from "../../utils/interfaces";

/**
 * 阿里小程序 网络请求类
 */
export default class HttpAlimini implements httpInterface {

  send(url: string, data: any, method: string = 'post', header: any) {
    // @ts-ignore
    my.request({
      url,
      method,
      data,
      header: {
        'content-type': 'application/json' // 默认值
      }
    })

  }
}
