import Basic from "./core";
import {Log} from "../../utils/interfaces";

import HttpUni from "../http/http.uni";
import StorageUni from "../storage/storage.uni";


export default class Uni extends Basic {

  injectHtppService() {
    this.$http = new HttpUni()
  }

  injectStorageService() {
    this.$storage = new StorageUni()
  }

  /**
   * 获取一些浏览器的常见数据
   */
  getCommonInfo() {

    var navigatorInfo: any = {}
    const noJoinAttr = ['plugins', 'mimeTypes']
    for (const attr in navigator) {
      if (!noJoinAttr.includes(attr)) {
        // @ts-ignore
        navigatorInfo[attr] = navigator[attr]
      }
    }

    return {
      location, navigator: {
        ...navigatorInfo
      }
    }
  }

  addListener() {
    //点击事件
    document.body.addEventListener('click', {
      handleEvent: (evt) => {
        console.log(evt, 2222);
        // @ts-ignore
        const {x, y, view: windowCtx} = evt;
        const {scrollX, scrollY, screen} = windowCtx;

        const logOjb: Log = {type: ' click', data: {x, y, scrollX, scrollY, screen}}
        this.logRecord(logOjb);
      }
    }, false);

    window.addEventListener('error', (evt) => {
      var upEntInfo = {}
      for (var k in evt) {
        // @ts-ignore
        if (!['target', 'currentTarget', 'srcElement', 'path'].includes(k) && typeof evt[k] !== "function") {
          // @ts-ignore
          upEntInfo[k] = evt[k]
        }
      }
      console.log(upEntInfo)
      this.logRecord({type: 'onerror', level: 'error', data: {error: upEntInfo}})
    })
  }

}
