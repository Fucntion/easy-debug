// @ts-nocheck
'use strict';

import {getNowTimeFull} from "../../utils";
import {httpInterface, Log, logData, storageInterface} from "../../utils/interfaces";

//配置
const VERSION = '1.1.4'

const defaultConfig = {
  upLogUrl: 'http://1.117.227.95/:9100/api/bug/up'
}


class Basic {

  tempList: any = []
  sendTime: number = 10 * 1000//一分钟一次
  trynum: number = 3//重试残次
  intervalCtx: any = null
  AppID = ''
  AppSecret = ''
  environment = ''
  version = ''


  config = {
    upLogUrl: ''
  }

  $storage: storageInterface = {
    set(source, val) {
    },
    get(key) {
    },
    remove(key) {
    },
    clear() {
    }
  }

  $http: httpInterface = {
    send() {
    }
  }


  constructor({AppID, AppSecret, Env = 'Brower'}) {
    if (!AppID || !AppSecret || !Env) {
      throw Error('EasyDebug初始化失败')
    }
    this.AppID = AppID
    this.AppSecret = AppSecret
    this.environment = Env
    this.version = VERSION

    this.config = {...defaultConfig}

  }


  startEasyDebugService() {
    //
    // this.injectListenService()
    this.injectStorageService()
    this.injectHtppService()
    //this.injectUpService()

    this.addListener()
    this.intervalCtx = setInterval(this.upLog.bind(this), this.sendTime)
  }


  // injectListenService(){}
  injectStorageService() {
  }

  injectHtppService() {
  }

  injectUpService() {
  }


  getCommonInfo() {
    return {}
  }

  addListener() {

  }


  /**
   * 手动记录记录
   * @param log
   * @constructor
   */
  logRecord(log: Log) {
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
    this.$storage.set('tempList', this.tempList)
    //先加一次就传一次吧，后面再合并多个。
    //this.upLog()
  }

  /**
   * 做一些通用的操作
   * @param data
   */
  _httpFormatData(data: logData) {
    var sendData = ''
    if (typeof data === 'object' && JSON.stringify(data) !== '{}') {

    } else {
      throw Error('上传信息失败')
    }
    //全部都要appid
    data.AppID = this.AppID
    sendData = JSON.stringify(data)
    return sendData
  }

  /**
   * 上传数据
   * @constructor
   */
  upLog() {
    if (this.tempList.length < 1) return;
    this.$http.send(this.config.upLogUrl, this._httpFormatData({logs: this.tempList}))
    this.tempList = []
    this.$storage.remove('tempList')
  }


  /**
   * 停止
   * @constructor
   */
  stop() {
    clearInterval(this.intervalCtx)
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

export default Basic
