import EnvBase from "./env.base";
import {Log} from "../utils/interfaces";

/**
 * 浏览器实例类
 */
export default class EnvBrower extends EnvBase {
    constructor(debugCtx:any) {
        super(debugCtx);
    }
    /**
     * 获取一些浏览器的常见数据
     */
    getCommonInfo() {

        var navigatorInfo:any = {}
        const noJoinAttr = ['plugins','mimeTypes']
        for(const attr in navigator)
        {
            if(!noJoinAttr.includes(attr)){
                // @ts-ignore
                navigatorInfo[attr] = navigator[attr]
            }
        }

        return {
            location, navigator:{
                ...navigatorInfo
            }
        }
    }

    /**
     * 添加监听
     * @constructor
     */
    AddLister() {

        //点击事件
        document.body.addEventListener('click', {
            handleEvent: (evt) => {
                console.log(evt, 2222);
                // @ts-ignore
                const {x, y, view: windowCtx} = evt;
                const {scrollX, scrollY, screen} = windowCtx;

                const logOjb:Log = {type: ' click', data: {x, y, scrollX, scrollY, screen}}
                this.LogRecord(logOjb);
            }
        }, false);


        window.addEventListener('error', (evt) => {
            var upEntInfo = {}
            for(var k in evt){

                // @ts-ignore
                if(!['target','currentTarget','srcElement','path'].includes(k) && typeof evt[k] !== "function"){
                    // @ts-ignore
                    upEntInfo[k] = evt[k]
                }
            }
            this.LogRecord({type: 'onerror', level: 'error', data: {error:upEntInfo}})
        })

    }

}
