import {httpInterface} from "../../utils/interfaces";

/**
 * 浏览器 网络请求类
 */
export default class HttpBrower implements httpInterface {


  send(url: string, data: any, method: string = 'post', header: any) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader('content-type', 'application/json');
    //xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status === 200) {
        }
      }
    };

    xhr.send(data);
  }
}
