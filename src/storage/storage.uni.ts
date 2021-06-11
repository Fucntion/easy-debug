/// <reference path = "../fun.d.ts" />

import {storageInterface} from "../utils/interfaces";

export default class StorageUni implements storageInterface{
    set(key: string, val: any): void {
        try {
            uni.setStorageSync(key, val)
        } catch (e) {
            alert(`设置Storage失败，key：${key}`)
            throw e
        }
    }

    get(key: string): boolean {
        try {
            return uni.getStorageSync(key);
        } catch (e) {
            alert(`获取Storage失败，key：${key}`)
            throw e
        }
    }

    remove(key: string): void {
        uni.removeStorageSync(key)
    }

    clear(): void {
        uni.clearStorageSync()
    }
}
