import BaseClass from "../utils/base.class";
import {logData} from "../utils/interfaces";

export default class HttpBase extends BaseClass{
    constructor(debugCtx:any) {
        super(debugCtx);
    }
    /**
     * 做一些通用的操作
     * @param data
     */
    formatData(data:logData) {
        var sendData = ''
        if (typeof data === 'object' && JSON.stringify(data) !== '{}') {

        } else {
            throw Error('上传信息失败')
        }
        //全部都要appid
        // @ts-ignore
        data.AppID = this.debugCtx.AppID
        console.log('upload data is', data)
        sendData = JSON.stringify(data)
        // var fd = new FormData(data);
        return sendData
    }
}
