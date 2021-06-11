// @ts-nocheck
'use strict';
declare var wx: any
declare var my: any

const VERSION = '1.1.2'

//配置
const defaultConfig = {
    upLogUrl: 'http://localhost:9100/api/bug/up'
}

const utils = {
    getNowTime: () => {
        return new Date().getTime();
    }
};

/**
 * 所有drvie都要用这个，因为这样会在需要使用实例的时候好调用
 */
class DriveBase {
    debugCtx = null

    constructor(debugCtx:any) {
        this.debugCtx = debugCtx
    }
}


//接口类，各个平台都要实现这个

//本地存储类
interface storageInterface {
    set(source: string, val: any): void;

    get(key: string): any;

    remove(key: string): void;

    clear(): void;
}

//发送
interface httpInterface {
    send(url: string, data: any, method: string, header: any): void
}


class HttpBase extends DriveBase {
    /**
     * 做一些通用的操作
     * @param data
     */
    formatData(data) {
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

class WebHttp extends HttpBase {

    send(url: string, data: any, method: string = 'post', header: any) {
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

}

class WxMiniHttp extends HttpBase {

    send(url: string, data: any, method: string = 'post', header: any) {

        wx.request({
            url,
            method,
            //appid
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })
    }

}


class AliMiniHttp extends HttpBase {

    send(url: string, data: any, method: string = 'post', header: any) {

        my.request({
            url,
            method,
            //appid
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })
        // var xhr = new XMLHttpRequest();
        // xhr.open(method, url, true);
        // xhr.setRequestHeader('content-type', 'application/json');
        // //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.onload = function () {
        //     if (xhr.readyState === xhr.DONE) {
        //         if (xhr.status === 200) {
        //             console.log(xhr);
        //         }
        //     }
        // };
        //
        // xhr.send(this.formatData(data));
    }

}


class UniHttp extends HttpBase {

    send(url: string, data: any, method: string = 'post', header: any) {

        uni.request({
            url,
            method,
            //appid
            data: this.formatData(data),
            header: {
                'content-type': 'application/json' // 默认值
            }
        })
        // var xhr = new XMLHttpRequest();
        // xhr.open(method, url, true);
        // xhr.setRequestHeader('content-type', 'application/json');
        // //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // xhr.onload = function () {
        //     if (xhr.readyState === xhr.DONE) {
        //         if (xhr.status === 200) {
        //             console.log(xhr);
        //         }
        //     }
        // };
        //
        // xhr.send(this.formatData(data));
    }

}


class WebLS extends DriveBase implements storageInterface {

    set(key: string, val: any): void {
        try {
            const data = {value: val, type: typeof val}
            localStorage.setItem(key, JSON.stringify(data))
        } catch (e) {
            alert(`设置Storage失败，key：${key}`)
            throw e
        }
    }

    get(key: string): boolean {
        try {
            let data: any = localStorage.getItem(key)
            if (!data) return data;
            data = JSON.parse(data)
            return data.value;
        } catch (e) {
            alert(`获取Storage失败，key：${key}`)
            throw e
        }
    }

    remove(key: string): void {
        localStorage.removeItem(key)
    }

    clear(): void {
        localStorage.clear()
    }

}

class WxMiniLS extends DriveBase implements storageInterface {

    set(key: string, val: any): void {
        try {
            wx.setStorageSync(key, val)
        } catch (e) {
            alert(`设置Storage失败，key：${key}`)
            throw e
        }
    }

    get(key: string): boolean {
        try {
            let data: any = wx.getStorageSync(key)
            return data;
        } catch (e) {
            alert(`获取Storage失败，key：${key}`)
            throw e
        }
    }

    remove(key: string): void {
        wx.removeStorageSync(key)
    }

    clear(): void {
        wx.clearStorageSync()
    }

}

class AliMiniLS extends DriveBase implements storageInterface {

    set(key: string, val: any): void {
        try {
            my.setStorageSync(key, val)
        } catch (e) {
            alert(`设置Storage失败，key：${key}`)
            throw e
        }
    }

    get(key: string): boolean {
        try {
            let data: any = my.getStorageSync(key)
            return data;
        } catch (e) {
            alert(`获取Storage失败，key：${key}`)
            throw e
        }
    }

    remove(key: string): void {
        my.removeStorageSync(key)
    }

    clear(): void {
        my.clearStorageSync()
    }

}

class UniLS extends DriveBase implements storageInterface {

    set(key: string, val: any): void {
        try {
            uni.setStorageSync(key, val)
        } catch (e) {
            alert(`设置Storage失败，key：${key}`)
            throw e
        }
    }

    get(key: string): boolean {
        try {
            let data: any = uni.getStorageSync(key)
            return data;
        } catch (e) {
            alert(`获取Storage失败，key：${key}`)
            throw e
        }
    }

    remove(key: string): void {
        uni.removeStorageSync(key)
    }

    clear(): void {
        uni.clearStorageSync()
    }

}



class envBase extends DriveBase {

    tempList = []
    sendTime = 10 * 1000//一分钟一次
    trynum = 3//重试残次
    intervalCtx = null
}


class Brower extends envBase {

    /**
     * 获取一些浏览器的常见数据
     */
    getCommonInfo() {
        return {
            location, navigator
        }
    }

    /**
     * 添加监听
     * @constructor
     */
    AddLister() {

        //点击事件
        document.body.addEventListener('click', {
            handleEvent: (evt) => {
                console.log(evt, 2222);
                // @ts-ignore
                const {x, y, view: windowCtx} = evt;
                const {scrollX, scrollY, screen} = windowCtx;
                this.LogRecord({type: ' click', data: {x, y, scrollX, scrollY, screen}});
            }
        }, false);


        window.addEventListener('error', (evt) => {
            const {message, lineno, colno, error} = evt
            // console.log({message,lineno,colno,error})
            this.LogRecord({type: 'onerror', level: 'error', data: {message, lineno, colno, error}})
        })

    }

    /**
     * 开始服务
     * @constructor
     */
    Start() {
        this.AddLister();
        //this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    /**
     * 手动记录记录
     * @param {String} type 事件类型 [none,click,touch]
     * @param data 数据
     * @param {String} level 消息类型 info warning console
     * @constructor
     */
    LogRecord({type, data, level = 'info'}) {
        // @ts-ignore
        this.tempList.push({type, data: {...data, ...this.getCommonInfo()}, level, create_at: utils.getNowTime(), env: this.debugCtx.environment});
        console.log(this.tempList);
        // @ts-ignore
        this.debugCtx.drive.storage.set('tempList', this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        // @ts-ignore
        this.debugCtx.drive.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        this.debugCtx.drive.storage.remove('tempList')
    }

    /**
     * 停止
     * @constructor
     */
    Stop() {
        // @ts-ignore
        clearInterval(this.intervalCtx)
    }
}

class WxMini extends envBase {

    /**
     * 获取微信的页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pages = getCurrentPages()
        const N = pages.length - 1
        console.log(pages[N])
        // const currentPagePath = JSON.stringify(pages[N].__proto__.route)
        return {
            // currentPagePath
        }

    }

    /**
     * 添加监听
     * @constructor
     */
    AddLister() {


    }

    /**
     * 开始服务
     * @constructor
     */
    Start() {
        this.AddLister();
        //this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    /**
     * 手动记录记录
     * @param {String} type 事件类型 [none,click,touch]
     * @param data 数据
     * @param {String} level 消息类型 info warning console
     * @constructor
     */
    LogRecord({type, data, level = 'info'}) {
        // @ts-ignore
        this.tempList.push({type, data: {...data, ...this.getCommonInfo()}, level, create_at: utils.getNowTime(), env: this.debugCtx.environment});
        console.log(this.tempList);
        this.debugCtx.drive.storage.set('tempList',this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        // this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        // @ts-ignore
        this.debugCtx.drive.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        this.debugCtx.drive.storage.remove('tempList')
    }

    /**
     * 停止
     * @constructor
     */
    Stop() {
        // @ts-ignore
        clearInterval(this.intervalCtx)
    }
}

class AliMini extends envBase {

    /**
     * 获取当前的支付宝小程序页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pages = getCurrentPages()
        const N = pages.length - 1
        const currentPagePath = JSON.stringify(pages[N].__proto__.route)
        return {
            currentPagePath
        }
    }

    /**
     * 添加监听
     * @constructor
     */
    AddLister() {


    }

    /**
     * 开始服务
     * @constructor
     */
    Start() {
        this.AddLister();
        //this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    /**
     * 手动记录记录
     * @param {String} type 事件类型 [none,click,touch]
     * @param data 数据
     * @param {String} level 消息类型 info warning console
     * @constructor
     */
    LogRecord({type, data, level = 'info'}) {
        // @ts-ignore
        this.tempList.push({type, data: {...data, ...this.getCommonInfo()}, level, create_at: utils.getNowTime(), env: this.debugCtx.environment});
        console.log(this.tempList);
        this.debugCtx.drive.storage.set('tempList',this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        // this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        // @ts-ignore
        this.debugCtx.drive.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        this.debugCtx.drive.storage.remove('tempList')
    }

    /**
     * 停止
     * @constructor
     */
    Stop() {
        // @ts-ignore
        clearInterval(this.intervalCtx)
    }
}



class Uni extends envBase {

    /**
     * 获取当前的支付宝小程序页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pageInstanceList = getCurrentPages()
        const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
        return {
            currentPagePath
        }
    }

    /**
     * 添加监听
     * @constructor
     */
    AddLister() {


    }

    /**
     * 开始服务
     * @constructor
     */
    Start() {
        this.AddLister();
        //this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    /**
     * 手动记录记录
     * @param {String} type 事件类型 [none,click,touch]
     * @param data 数据
     * @param {String} level 消息类型 info warning console
     * @constructor
     */
    LogRecord({type, data, level = 'info'}) {
        // @ts-ignore
        this.tempList.push({type, data: {...data, ...this.getCommonInfo()}, level, create_at: utils.getNowTime(), env: this.debugCtx.environment});
        console.log(this.tempList);
        this.debugCtx.drive.storage.set('tempList',this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        // this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        // @ts-ignore
        this.debugCtx.drive.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        this.debugCtx.drive.storage.remove('tempList')
    }

    /**
     * 停止
     * @constructor
     */
    Stop() {
        // @ts-ignore
        clearInterval(this.intervalCtx)
    }
}


(function (global, factory) {

    /* CommonJS */
    if (typeof require === 'function' && typeof module === 'object' && module && module.exports) {
        module.exports = (function () {
            return factory();
        })();
    } else {
        /* Global */
        global.EasyDebug = factory();
    }

})(this, function () {

    return {
        AppID: '',
        AppSecret: '',
        environment: '', // 默认web可选值为'Brower','WxMini','AliMini'
        version: VERSION,
        //利用驱动的方式，来搞定存储以及上传
        drive: {
            env: null,
            storage: null,
            http: null,
        },
        config: {...defaultConfig},
        /**
         * 设置单项配置
         * @param key
         * @param val
         */
        setConfig(key, val) {
            this.config[key] = val
        },
        /**
         * 设置多项配置
         * @param opts
         */
        setConfigs(opts) {
            this.config = {...this.config, ...opts}
        },
        initApp({AppID, AppSecret, Env = 'Brower'}) {
            this.AppID = AppID;
            this.AppSecret = AppSecret;
            this.environment = Env;

            if (this.environment === 'Brower') {

                this.drive.env = new Brower(this)
                this.drive.storage = new WebLS(this)
                this.drive.http = new WebHttp(this)
                console.log(this.drive.http)
                // this.drive.env.start()
                // @ts-ignore
                // classInterface.ensureImplements(ctx, listerInterface, recordInterface, upInterface);
                this.drive.env.Start()
            }

            if (this.environment === 'WxMini') {
                this.drive.env = new WxMini(this)
                this.drive.storage = new WxMiniLS(this)
                this.drive.http = new WxMiniHttp(this)
                this.drive.env.Start()
            }

            if (this.environment === 'AliMini') {
                this.drive.env = new AliMini(this)
                this.drive.storage = new AliMiniLS(this)
                this.drive.http = new AliMiniHttp(this)
                this.drive.env.Start()
            }

            
            if (this.environment === 'Uni') {
                this.drive.env = new Uni(this)
                this.drive.storage = new UniLS(this)
                this.drive.http = new UniHttp(this)
                this.drive.env.Start()
            }


            return this;
        },
    };
});
