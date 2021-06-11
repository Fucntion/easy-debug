/**
 * 所有drvie都要用这个，因为这样会在需要使用实例的时候好调用
 */
export default class BaseClass {
    debugCtx:any = null
    constructor(debugCtx:any){
        this.debugCtx = debugCtx
    }
}
