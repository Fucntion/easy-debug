import {httpInterface} from "../../utils/interfaces";

/**
 * uniapp 网络请求类
 */
export default class HttpUni implements httpInterface {

  send(url: string, data: any, method: string = 'post', header: any) {
    // @ts-ignore
    uni.request({
      url,
      method,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      }
    })

  }
}
