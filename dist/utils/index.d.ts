/**
 * utils.ts
 * 存放工具函数
 */
import { IMockInstance } from "../types/index";
/**
 * 生成随机内容和长度文本段落，包含简体中文、繁体中文、英文、空格、数字和特殊符号
 * @param {number} minLength - 生成文本的最小长度
 * @param {number} maxLength - 生成文本的最大长度
 * @returns {string} - 生成的随机文本段落
 */
declare const generateRandomText: (minLength: number, maxLength: number) => string;
/**
 * 生成随机时间（毫秒）
 * @param {number} minTime - 最小时间（毫秒）
 * @param {number} maxTime - 最大时间（毫秒）
 * @returns {number} - 生成的随机时间（毫秒）
 */
declare const generateRandomTime: (minTime: number, maxTime: number) => number;
/**
 * 生成随机图片尺寸（长x宽）
 * @param {number} minWidth - 最小宽度（像素）
 * @param {number} maxWidth - 最大宽度（像素）
 * @param {number} minHeight - 最小高度（像素）
 * @param {number} maxHeight - 最大高度（像素）
 * @returns {string} - 生成的图片尺寸字符串（格式为 "200x800"）
 */
declare const generateRandomImageSize: (minWidth: number, maxWidth: number, minHeight: number, maxHeight: number) => string;
/**
 * 生成随机颜色（#RRGGBB格式）
 * @returns {string} - 生成的随机颜色字符串
 */
declare const generateRandomColor: () => string;
/**
 * 生成时间字符串（格式为 yyyy-mm-dd hh:mm:ss）
 * @returns {string} - 生成的时间字符串
 */
declare const generateTimeString: () => string;
/**
 * 生成随机的URL，包含email方式
 * @returns {string} - 生成的随机URL
 */
declare const generateRandomUrl: () => string;
/**
 * 生成随机Base64编码的JPG图片，图片最大不超过400KB
 * @returns {string} - 生成的随机Base64编码的JPG图片
 */
declare const generateRandomBase64Image: () => string;
/**
 * 生成模拟对象
 * 根据配置和ID生成一个包含随机数据的对象
 * 该函数用于创建具有特定格式的模拟数据，格式基于配置参数中指定的类型
 *
 * @param config - 模拟实例的配置，决定了生成的对象中应包含的字段类型
 * @param id - 分配给生成对象的标识符
 * @returns 返回一个包含随机数据的模拟对象
 */
declare const generateMockObject: (config: IMockInstance["config"], id: number) => Record<string, any>;
export { generateMockObject, generateRandomText, generateRandomTime, generateRandomImageSize, generateRandomColor, generateTimeString, generateRandomUrl, generateRandomBase64Image };
