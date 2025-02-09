/**
 * @module ezzMock
 *
 * @author Naje Szl
 */
import { IMockInstance, IPollingConfig } from "./types/index";
/**
 * 创建一个ezzMock的实例
 *
 * 此函数的目的是封装MockInstance的创建过程，并提供一个简单的接口来获取模拟数据
 * 它允许用户通过传递配置参数来定制MockInstance的行为
 *
 * @param config - 可选的配置对象，用于定制MockInstance的行为如果未提供，则使用默认配置
 * @returns 返回由MockInstance生成的模拟数据
 */
declare const Mock: (config?: IMockInstance["config"]) => Promise<any>;
/**
 * 模拟轮询功能函数
 * @param config 轮询配置对象，包含轮询间隔、最大轮询次数和初始数据
 * @returns 返回一个Promise对象，代表轮询过程
 */
declare const Polling: (config?: IPollingConfig) => Promise<unknown>;
export { Mock, Polling };
