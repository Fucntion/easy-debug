import HttpBase from "./http.base";
import {httpInterface} from "../utils/interfaces";
/**
 * 微信小程序 网络请求类
 */
export default class HttpWxmini extends HttpBase implements httpInterface{
    constructor(debugCtx:any) {
        super(debugCtx);
    }
    send(url: string, data: any, method: string = 'post', header: any) {
        // @ts-ignore
        wx.request({
            url,
            method,
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })

    }
}
