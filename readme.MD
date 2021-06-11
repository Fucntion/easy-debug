# easy-debug

支持pc和移动端web,微信小程序，支付宝小程序，头条小程序的错误收集上报，分析小工具。

## 安装使用

### npm 

```javascript

 //yarn easy-debug -S
 
 const EasyDebug = require('EasyDebug') // require('EasyDebug/dist/EasyDebug.js')

 //初始化 Env可选参数(Brower/WxMini/AliMini) 
 const bugCtx = EasyDebug.initApp({
     AppID:'jwCbG268w0sYfOdv',
     AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
     Env:'AliMini'
 })
 //初始化后自动接管控制台报错并上报
 
 //如果需要手动上报自定义的信息
 bugCtx.drive.env.LogRecord({type, data, level})
 bugCtx.drive.env.UpLog()

```

### cdn
```html
<script src="https://cdn.jsdelivr.net/npm/easy-debug@1.0.4/dist/EasyDebug.js"></script>
<script>
    //初始化 Env可选参数(Brower/WxMini/AliMini) 
    const bugCtx = EasyDebug.initApp({
        AppID:'jwCbG268w0sYfOdv',
        AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',
        Env:'AliMini'
    })
    //初始化后自动接管控制台报错并上报

    //如果需要手动上报自定义的信息
    bugCtx.drive.env.LogRecord({type, data, level})
    bugCtx.drive.env.UpLog()
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
const bugCtx = EasyDebug.initApp({
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


### 微信小程序

```javascript
// app.js
const EasyDebug = require('easybug/index.js')
const bugCtx = EasyDebug.initApp({
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
    bugCtx.drive.env.LogRecord({type:'onError',level:'error',data:{msg}})
    bugCtx.drive.env.Uplog()
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
const bugCtx = EasyDebug.initApp({
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
    bugCtx.drive.env.LogRecord({type:'onError',level:'error',data:{msg:error}})
    bugCtx.drive.env.UpLog()
  },
});

```



