export const getNowTime = () => {
  return new Date().getTime();
}


export const getNowTimeFull = () => {
  var date = new Date();
  var transverse = "-";
  var Verticalpoint = ":";
  var month: any = date.getMonth() + 1;//获取月份
  var strDate: any = date.getDate();//获取具体的日期
  var strHour: any = date.getHours();//获取...钟点
  var strMinute: any = date.getMinutes();//获取分钟数
  var strSeconde: any = date.getSeconds();//获取秒钟数
  //判断获取月份 、 具体的日期 、...钟点、分钟数、秒钟数 是否在1~9
  //如果是则在前面加“0”
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 1 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  if (strHour >= 1 && strHour <= 9) {
    strHour = "0" + strHour
  }
  if (strMinute >= 1 && strMinute <= 9) {
    strMinute = "0" + strMinute;
  }

  if (strSeconde >= 1 && strSeconde <= 9) {
    strSeconde = "0" + strSeconde;
  }
  //时间日期字符串拼接
  const nowData = date.getFullYear() + transverse + month + transverse + strDate + " " +
    strHour + Verticalpoint + strMinute + Verticalpoint + strSeconde;
  //返回拼接字符串
  return nowData;
}

//装饰器
export function Inject(modules: any) {
  return function (target: any) {
    modules.forEach((module: any) => {
      target.prototype[module.name] = new module();
    });
  };
}
