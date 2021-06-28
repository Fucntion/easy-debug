// @ts-nocheck
'use strict';

import Web from "./libs/channel/web";
import Uni from "./libs/channel/uni";
import WxMini from "./libs/channel/wxmini";
import AliMini from "./libs/channel/alimini";

module.exports = {
  getInstacne({AppID, AppSecret, Env = 'Brower'}) {
    if (Env === 'Brower') {
      return new Web({AppID, AppSecret, Env})
    }
    if (Env === 'Uni') {
      return new Uni({AppID, AppSecret, Env})
    }
    if (Env === 'WxMini') {
      return new WxMini({AppID, AppSecret, Env})
    }
    if (Env === 'AliMini') {
      return new AliMini({AppID, AppSecret, Env})
    }
  }
}
