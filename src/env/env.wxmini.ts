import EnvBase from "./env.base";

/**
 * 微信小程序实例类
 */
export default class EnvWxmini extends EnvBase {

    constructor(debugCtx:any) {
        super(debugCtx);
    }

    /**
     * 获取微信的页面
     */
    getCommonInfo() {
        // @ts-ignore
        const pages = getCurrentPages()
        const N = pages.length - 1
        console.log(pages[N])
        // const currentPagePath = JSON.stringify(pages[N].__proto__.route)
        return {
            // currentPagePath
        }

    }


}
