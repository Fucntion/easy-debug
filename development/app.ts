const EasyDebug = require('../src/main')

var ctx = new EasyDebug.getInstacne({AppID:'jwCbG268w0sYfOdv',AppSecret:'6UkYvpyOlUb5Z4BD8PvRhl9h1yMbCC42',Env:'Brower'})
console.log(ctx)
ctx.start()
setTimeout(()=>{
  throw Error('你需要寻找的dom节点不存在')
},2000)
