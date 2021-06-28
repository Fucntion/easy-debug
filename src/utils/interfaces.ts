interface initFunc {
  (key: string, val: string): void;
}

export interface EasyDebug {
  AppID: string,
  AppSecret: string,
  environment: string,
  readonly version: string,
  drive: {
    env: any,
    storage: any,
    http: any,
  },
  config: any,
  setConfig: initFunc
}

export interface EnvInterface {

}

export interface Log {
  type: string,
  data: any,
  level?: string
}

export interface logData {

}

//本地存储类
export interface storageInterface {
  set(source: string, val: any): void;

  get(key: string): any;

  remove(key: string): void;

  clear(): void;
}

//发送
export interface httpInterface {
  send(url: string, data: any, method: string, header: any): void
}
