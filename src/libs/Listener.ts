import {Log} from "../utils/interfaces";

export default class Listener{
    addListener(){
        
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
            console.log(upEntInfo)
            this.LogRecord({type: 'onerror', level: 'error', data: {error:upEntInfo}})
        })

    }
}
