/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @module ezMock
 *
 * @author Naje Szl
 */
import { IMockInstance, IPollingConfig } from "./types/index";
import { generateMockObject } from "./utils/index";

class MockInstance implements IMockInstance {
  // 集中管理默认配置
  private static defaultConfig: IMockInstance["config"] = {
    isObject: false,
    log: false,
    maxRadomTime: 3,
    onlyReject: false,
    isRadomStatus: true,
    isObjectArray: true,
    objectFieldType: [
      "string",
      "number",
      "boolean",
      "object",
      "array",
      "time",
      "url",
      "image",
    ],
    maxObjectArraySize: 500,
  };

  constructor(config?: IMockInstance["config"]) {

 
    // 使用解构赋值并提供默认值
    this.config = {
      ...MockInstance.defaultConfig,
      ...config,
      isRadomObjectArray: config?.maxObjectArraySize ? false : true,
    };
    this.config.log && console.log("ezMock - config:", this.config);
    const radomTime = Math.ceil(Math.random() * this.config.maxRadomTime!);
    const responseData: {
      code: string;
      data: null | Record<string, any> | Record<string, any>[];
    } = {
      code: "ok",
      data: null,
    };

    //返回格式处理==
    //返回对象形式
    if (this.config.isObject) {
      responseData.data = generateMockObject(this.config, 1);
    }

    //返回对象数组形式
    if (this.config.isObjectArray) {
      const size = this.config.isRadomObjectArray ? Math.ceil(Math.random() * this.config.maxObjectArraySize!) : this.config.maxObjectArraySize!
      responseData.data = [];
      for (let i = 0; i < size!; i++) {
        const obj = generateMockObject(this.config, i + 1);

        responseData.data.push(obj);
      }
    }

    this.mock = new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        clearTimeout(timer); // 清除计时器
        if (this.config.onlyReject) {
          return reject(new Error("ezMock - network error! so run reject"));
        }
        if (this.config.isRadomStatus) {
          const isResolve = Math.random() > 0.4;
          if (isResolve) {
            this.config.log && console.log("ezMock - responseData", responseData);
            resolve(responseData);
          } else {
            reject(new Error("ezMock - network error! so run reject"));
          }
        } else {
          this.config.log && console.log("ezMock - responseData ", responseData);
          resolve(responseData);
        }
      }, (this.config.delayTime ?? radomTime) * 1000);

      this.config.log && console.log("ezMock - delay ", this.config.delayTime ?? radomTime);
    });
  }
  config: IMockInstance["config"] & {isRadomObjectArray: boolean};

  mock: Promise<any> = Promise.resolve({ code: "ok", data: [] });
}

/**
 * 创建一个ezMock的实例
 * 
 * 此函数的目的是封装MockInstance的创建过程，并提供一个简单的接口来获取模拟数据
 * 它允许用户通过传递配置参数来定制MockInstance的行为
 * 
 * @param config - 可选的配置对象，用于定制MockInstance的行为如果未提供，则使用默认配置
 * @returns 返回由MockInstance生成的模拟数据
 */
const Mock = function (config?: IMockInstance["config"]) {
  // 创建一个新的MockInstance实例，并传入可能存在的配置参数
  const mock = new MockInstance(config);
  // 返回MockInstance实例的mock属性，即模拟数据
  return mock.mock;
};

/**
 * 模拟轮询功能函数
 * @param config 轮询配置对象，包含轮询间隔、最大轮询次数和初始数据
 * @returns 返回一个Promise对象，代表轮询过程
 */
const Polling = function (config: IPollingConfig) {
  // 成功轮询的响应模板
  const success = {
    code: "ok",
    message: "poll success",
    data: config.data,
  }
  // 失败轮询的响应模板
  const failed = {
    code: "500",
    message: "poll failed",
    data: config.data,
  }
  return new Promise((resolve, reject) => {
    let attempts = 0;
    // 设置最大轮询次数，默认为5次
    const maxAttempts = config?.maxPollingAttempts || 5;
    // 设置轮询间隔时间，默认为2秒
    const interval = config?.pollingInterval || 2;
    /**
     * 轮询函数
     * 该函数尝试进行轮询请求，并根据结果决定是否再次尝试或返回结果
     */
    const poll = () => {
      attempts++;
      console.log(`Polling attempt ${attempts}`);
      // 模拟轮询请求成功与否的概率
      const isOk = Math.random() > 0.4;
      if(isOk){
        // 如果成功，停止轮询并返回成功信息
        console.log(`Polling attempt ${attempts} successful`, success);
        resolve(success);
      }else{
        // 如果失败，打印失败信息并决定是否重试
        console.log(`Polling attempt ${attempts} fail, try again...`, failed);
        if (attempts < maxAttempts) {
          // 如果未达到最大尝试次数，继续轮询
          setTimeout(poll, interval * 1000);
        } else {
          // 如果达到最大尝试次数，轮询失败
          reject(new Error(`Polling failed after ${maxAttempts} attempts`));
        }
      }
    };
    // 开始首次轮询
    poll();
  });
};

if (typeof window !== "undefined") {
  (window as any).ezMock = {
    Mock,
    Polling,
  };
}

// 确保在 Node.js 环境中也能正常导出
export { Mock, Polling };
