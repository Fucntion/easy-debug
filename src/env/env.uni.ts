import EnvBase from "./env.base";

/**
 * uniapp实例类
 */

export default class EnvUni extends EnvBase {
    constructor(debugCtx:any) {
        super(debugCtx);
    }
    /**
     * 获取当前的支付宝小程序页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pageInstanceList = getCurrentPages()
        const currentPagePath = pageInstanceList[pageInstanceList.length - 1].route
        return {
            currentPagePath
        }
    }



}
