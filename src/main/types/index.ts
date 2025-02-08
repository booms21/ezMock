export interface IMockInstance {
  mock: Promise<{ code: string; data: any }>;
  config: {
    isObject?: boolean;
    delayTime?:number;
    maxRadomTime?: number;
    onlyReject?: boolean;
    isRadomStatus?: boolean;
    isObjectArray?: boolean;
    objectFieldType?: Array<
      | "string"
      | "number"
      | "boolean"
      | "object"
      | "array"
      | "url"
      | "image"
      | "time"
      | "color"
      | "base64Image"
    >;
    maxObjectArraySize?: number;
    // 添加轮询相关的配置项
    pollingInterval?: number; // 轮询间隔时间（毫秒）
    maxPollingAttempts?: number; // 最大轮询次数
    log?: boolean;
  };
}

export interface IPollingConfig {
  data: any;
  maxPollingAttempts?: number;
  pollingInterval?: number;
}