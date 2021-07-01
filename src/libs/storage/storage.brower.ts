import {storageInterface} from "../../utils/interfaces";
import {objToJsonStr} from "../../utils";

export default class StorageBrower implements storageInterface {
  set(key: string, val: any): void {
    try {
      const data = {value: val, type: typeof val}
      var strVal = objToJsonStr(data)
      localStorage.setItem(key, strVal)

    } catch (e) {
      alert(`设置Storage失败，key：${key}`)
      throw e
    }
  }

  get(key: string): boolean {
    try {
      let data: any = localStorage.getItem(key)
      if (!data) return data;
      data = JSON.parse(data)
      return data.value;
    } catch (e) {
      alert(`获取Storage失败，key：${key}`)
      throw e
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }

  clear(): void {
    localStorage.clear()
  }
}
