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
import {Inject} from "./utils";

//配置
const VERSION = '1.1.4'
const defaultConfig = {
    upLogUrl: 'http://1.117.227.95/:9100/api/bug/up'
}

// @Inject([Http,Storage,Debug])
class EasyDebug {

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

    // initApp({AppID, AppSecret, Env = 'Brower'}) {
    //     this.AppID = AppID;
    //     this.AppSecret = AppSecret;
    //     this.environment = Env;
    //
    //     if (this.environment === 'Brower') {
    //         this.drive.env = new EnvBrower(this)
    //         this.drive.storage = new StorageBrower(this)
    //         this.drive.http = new HttpBrower(this)
    //         this.drive.env.Start()
    //     }
    //
    //     if (this.environment === 'WxMini') {
    //         this.drive.env = new EnvWxmini(this)
    //         this.drive.storage = new StorageWxmini(this)
    //         this.drive.http = new HttpWxmini(this)
    //         this.drive.env.Start()
    //     }
    //
    //     if (this.environment === 'AliMini') {
    //         this.drive.env = new EnvAlimini(this)
    //         this.drive.storage = new StorageAlimini(this)
    //         this.drive.http = new HttpAlimini(this)
    //         this.drive.env.Start()
    //     }
    //
    //
    //     if (this.environment === 'Uni') {
    //         this.drive.env = new EnvUni(this)
    //         this.drive.storage = new StorageUni(this)
    //         this.drive.http = new HttpUni(this)
    //         this.drive.env.Start()
    //     }
    //
    //     //返回这个
    //     return this.drive.env;
    // }
}

export default EasyDebug
