# easy-debug

支持pc和移动端web,UNIAPP，微信小程序，支付宝小程序，头条小程序的错误收集上报，分析小工具。

## 安装使用

### npm

```javascript

 //yarn easy-debug -S
 
 const EasyDebug = require('easy-debug') // require('easy-debug/dist/EasyDebug.js')

 //初始化 Env可选参数(Brower/WxMini/AliMini/Uni) 
 const bugCtx = EasyDebug.init({
     AppID:'jwCbG268w0sYfOdv',
     AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
     Env:'AliMini'
 })
 //初始化后自动接管控制台报错并上报
 
 //如果需要手动上报自定义的信息
 bugCtx.logRecord({type, data, level})
 bugCtx.upLog()

 //修改配置的话
 bugCtx.setConfig(key,val)
 bugCtx.setConig('upLogUrl','xxxxxxx')
```

### cdn
```html
<script src="https://cdn.jsdelivr.net/npm/easy-debug/dist/EasyDebug.min.js"></script>
<script>
    //初始化 Env可选参数(Brower/WxMini/AliMini) 
    const bugCtx = EasyDebug.init({
        AppID:'jwCbG268w0sYfOdv',
        AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
        Env:'AliMini'
    })EasyDebug.min.js
    //初始化后自动接管控制台报错并上报

    //如果需要手动上报自定义的信息
    bugCtx.logRecord({type, data, level})
    bugCtx.upLog()
</script>
```

## 使用

### 浏览器
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>EasyDebug</title>
</head>
<body>

<script src="dist/EasyDebug.js"></script>
<script>
const bugCtx = EasyDebug.init({
    AppID:'jwCbG268w0sYfOdv',
    AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
    Env:'Brower'
})
console.log(bugCtx)
setTimeout(()=>{
  throw Error('xxxxxxx')
},4000)
</script>
</body>
</html>

```
### UNIAPP
```javascript
/**
 * 单个组件中使用,以app.vue为例
 */
//app.vue
const EasyDebug = require('easy-debug')
const bugCtx = EasyDebug.init({
    AppID:'jwCbG268w0sYfOdv',
    AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
    Env:'Uni'
})
export default {
  globalData: {
    
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function (options) {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  onError: function (msg) {
    console.log(msg)
    bugCtx.logRecord({type:'onError',level:'error',data:{msg}})
    bugCtx.upLog()
  }
}

/**
 * 写在main.js中全局可用
 */

//main.js
const EasyDebug = require('easy-debug')
const bugCtx = EasyDebug.init({
    AppID:'jwCbG268w0sYfOdv',
    AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
    Env:'Uni'
})


uni.$EasyDebug = EasyDebug

//这样可以在任意页面如下调用

uni.$EasyDebug.logRecord({type:'onError',level:'error',data:{msg}})
uni.$EasyDebug.uplog()


```

### 微信小程序

```javascript
// app.js
const EasyDebug = require('easy-debug')
const bugCtx = EasyDebug.init({
    AppID:'jwCbG268w0sYfOdv',
    AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
    Env:'WxMini'
})
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        throw Error('333333333333333')
      }
    })
  },
  onError (msg) {
    console.log(bugCtx)
    console.log(msg)
    bugCtx.logRecord({type:'onError',level:'error',data:{msg}})
    bugCtx.upLog()
  },
  globalData: {
    userInfo: null,
    bugCtx
  }
})

```

### 支付宝小程序

```javascript
const EasyDebug = require('./easybug/index.js')
const bugCtx = EasyDebug.init({
    AppID:'jwCbG268w0sYfOdv',
    AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
    Env:'AliMini'
})

App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
     throw Error('333333333333333')
  },
  onError (error) {
    console.log('app error',JSON.stringify(error));
    bugCtx.logRecord({type:'onError',level:'error',data:{msg:error}})
    bugCtx.upLog()
  },
});

```

## 后续升级计划
* 先优化浏览器环境下的页面全生命周期数据收集，参见谷歌出品的良心类库[PageLifecycle.js](https://github.com/GoogleChromeLabs/page-lifecycle
  )  
* 支持头条小程序
* 开始做项目的官网，并对外提供服务（需要cdn赞助）
