import EnvBase from "./env.base";
/**
 * 阿里小程序实例类
 */
export default class EnvAlimini extends EnvBase {
    constructor(debugCtx:any) {
        super(debugCtx);
    }
    /**
     * 获取当前的支付宝小程序页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pages = getCurrentPages()
        const N = pages.length - 1
        const currentPagePath = JSON.stringify(pages[N].__proto__.route)
        return {
            currentPagePath
        }
    }

}
