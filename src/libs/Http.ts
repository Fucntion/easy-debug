import {logData} from "../utils/interfaces";

class Http{

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

    send(url: string, data: any, method: string = 'post', header: any){
        console.log(this)
    }

    sendByAli(url: string, data: any, method: string = 'post', header: any) {
        // @ts-ignore
        my.request({
            url,
            method,
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })

    }

    sendByBrowwer(url: string, data: any, method: string = 'post', header: any) {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('content-type', 'application/json');
        //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (xhr.readyState === xhr.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr);
                }
            }
        };

        xhr.send(this.formatData(data));
    }

    sendByUni(url: string, data: any, method: string = 'post', header: any) {
        // @ts-ignore
        uni.request({
            url,
            method,
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })

    }

    sendByWxMini(url: string, data: any, method: string = 'post', header: any) {
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

export default Http
