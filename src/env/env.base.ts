import BaseClass from "../utils/base.class";
import {EnvInterface, Log} from "../utils/interfaces";
import {getNowTime, getNowTimeFull} from "../utils";


export default class EnvBase extends BaseClass implements EnvInterface{

    constructor(debugCtx:any) {
        super(debugCtx);
    }
    tempList: any = []
    sendTime:number = 10 * 1000//一分钟一次
    trynum:number = 3//重试残次
    intervalCtx: any = null

    getCommonInfo() {
        return {}
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
            env: this.debugCtx.environment
        });
        console.log(this.tempList);
        this.debugCtx.drive.storage.set('tempList', this.tempList)
        //先加一次就传一次吧，后面再合并多个。
        // this.UpLog()
    }

    /**
     * 上传数据
     * @constructor
     */
    UpLog() {
        if(this.tempList.length<1)return;
        this.debugCtx.drive.http.send(this.debugCtx.config.upLogUrl, {logs: this.tempList})
        this.tempList = []
        this.debugCtx.drive.storage.remove('tempList')
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



}
