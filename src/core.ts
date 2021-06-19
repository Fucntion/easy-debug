// @ts-nocheck
'use strict';

import EnvBrower from "./env/env.brower";
import StorageBrower from "./storage/storage.brower";
import HttpBrower from "./http/http.brower";

import EnvWxmini from "./env/env.wxmini";
import StorageWxmini from "./storage/storage.wxmini";
import HttpWxmini from "./http/http.wxmini";

import EnvAlimini from "./env/env.alimini";
import StorageAlimini from "./storage/storage.alimini";
import HttpAlimini from "./http/http.alimini";

import EnvUni from "./env/env.uni";
import StorageUni from "./storage/storage.uni";
import HttpUni from "./http/http.uni";

import Http from "./libs/Http";
import Storage from "./libs/Storage"
import Debug from "./libs/Debug";
import {getNowTimeFull, Inject} from "./utils";
import {Log} from "./utils/interfaces";

//配置
const VERSION = '1.1.4'
const defaultConfig = {
    upLogUrl: 'http://1.117.227.95/:9100/api/bug/up'
}

@Inject([Http,Storage,Debug])
class EasyDebug {

    tempList: any = []
    sendTime:number = 10 * 1000//一分钟一次
    trynum:number = 3//重试残次
    intervalCtx: any = null
    AppID = ''
    AppSecret = ''
    environment = ''
    version = ''

    constructor({AppID, AppSecret, Env = 'Brower'}) {

        if(!AppID || !AppSecret || !Env){
            throw Error('EasyDebug初始化失败')
        }
        this.AppID = AppID
        this.AppSecret = AppSecret
        this.environment = Env// 默认web可选值为'Brower','WxMini','AliMini'
        this.version = VERSION
        //利用驱动的方式，来搞定存储以及上传
        // this.drive = {
        //     env: null,
        //     storage: null,
        //     http: null,
        // }
        this.config = {...defaultConfig}
    }

    Start(){

        this.listen.start();
        this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    UpLog(){

    }

    /**
     * 手动记录记录
     * @param log
     * @constructor
     */
    LogRecord(log:Log) {
        const {type, data, level = 'info'} = log
        this.tempList.push({
            type,
            data: {...data, ...this.getCommonInfo()},
            level,
            create_at: getNowTimeFull(),
            // env: this.environment
        });
        console.log(this.tempList);
        //这里该如何调用drive但是又不会循环引用呢
        // this.storage.set('tempList', this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        // this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        if(this.tempList.length<1)return;
        // this.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        // this.storage.remove('tempList')
    }

    /**
     * 开始服务
     * @constructor
     */
    Start() {
        this.AddLister();
        this.intervalCtx = setInterval(this.UpLog.bind(this), this.sendTime)
    }

    /**
     * 停止
     * @constructor
     */
    Stop() {
        clearInterval(this.intervalCtx)
    }


    /**
     * 添加监听
     * @constructor
     */
    AddLister() {


    }


    getEnvironment(){
        return this.environment
    }

    getInstance(){
        return this
    }



    /**
     * 设置单项配置
     * @param key
     * @param val
     */
    setConfig(key, val) {
        this.config[key] = val
    }

    /**
     * 设置多项配置
     * @param opts
     */
    setConfigs(opts) {
        this.config = {...this.config, ...opts}
    }


}

export default EasyDebug
