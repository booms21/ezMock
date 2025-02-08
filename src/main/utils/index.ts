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
const generateRandomText = (minLength: number, maxLength: number): string => {
  const simplifiedChineseStart = 0x4e00;
  const simplifiedChineseEnd = 0x9fbf;
  const traditionalChineseStart = 0x4e00;
  const traditionalChineseEnd = 0x9fff;
  const englishStart = 0x41;
  const englishEnd = 0x7a;
  const digitStart = 0x30;
  const digitEnd = 0x39;
  const specialSymbols = "!@#$%^&*()_+[]{}|;:,.<>?/~`-=";
  const textLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let generatedText = "";

  for (let i = 0; i < textLength; i++) {
    const randomChoice = Math.floor(Math.random() * 6); // 6种字符类型
    switch (randomChoice) {
      case 0: // 简体中文
        const randomSimplifiedUnicode =
          Math.floor(
            Math.random() * (simplifiedChineseEnd - simplifiedChineseStart + 1)
          ) + simplifiedChineseStart;
        generatedText += String.fromCharCode(randomSimplifiedUnicode);
        break;
      case 1: // 繁体中文
        const randomTraditionalUnicode =
          Math.floor(
            Math.random() *
              (traditionalChineseEnd - traditionalChineseStart + 1)
          ) + traditionalChineseStart;
        generatedText += String.fromCharCode(randomTraditionalUnicode);
        break;
      case 2: // 英文
        const randomEnglishUnicode =
          Math.floor(Math.random() * (englishEnd - englishStart + 1)) +
          englishStart;
        generatedText += String.fromCharCode(randomEnglishUnicode);
        break;
      case 3: // 数字
        const randomDigitUnicode =
          Math.floor(Math.random() * (digitEnd - digitStart + 1)) + digitStart;
        generatedText += String.fromCharCode(randomDigitUnicode);
        break;
      case 4: // 空格
        generatedText += " ";
        break;
      case 5: // 特殊符号
        generatedText +=
          specialSymbols[Math.floor(Math.random() * specialSymbols.length)];
        break;
      default:
        break;
    }
  }
  return generatedText;
};

/**
 * 生成随机时间（毫秒）
 * @param {number} minTime - 最小时间（毫秒）
 * @param {number} maxTime - 最大时间（毫秒）
 * @returns {number} - 生成的随机时间（毫秒）
 */
const generateRandomTime = (minTime: number, maxTime: number): number => {
  return Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
};

/**
 * 生成随机图片尺寸（长x宽）
 * @param {number} minWidth - 最小宽度（像素）
 * @param {number} maxWidth - 最大宽度（像素）
 * @param {number} minHeight - 最小高度（像素）
 * @param {number} maxHeight - 最大高度（像素）
 * @returns {string} - 生成的图片尺寸字符串（格式为 "200x800"）
 */
const generateRandomImageSize = (
  minWidth: number,
  maxWidth: number,
  minHeight: number,
  maxHeight: number
): string => {
  const width =
    Math.floor(Math.random() * (maxWidth - minWidth + 1)) + minWidth;
  const height =
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  return `${width}x${height}`;
};

/**
 * 生成随机颜色（#RRGGBB格式）
 * @returns {string} - 生成的随机颜色字符串
 */
const generateRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return randomColor.padStart(6, "0");
};

/**
 * 生成时间字符串（格式为 yyyy-mm-dd hh:mm:ss）
 * @returns {string} - 生成的时间字符串
 */
const generateTimeString = (): string => {
  const randomTime = generateRandomTime(0, 86400000); // 生成0到24小时之间的随机时间戳
  const now = new Date(randomTime);
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * 生成随机的URL，包含email方式
 * @returns {string} - 生成的随机URL
 */
const generateRandomUrl = (): string => {
  const protocols = ["http://", "https://"];
  const domains = ["example.com", "test.org", "sample.net"];
  const paths = ["", "/path", "/path/to/resource"];
  const emails = ["user@example.com", "test@test.org", "info@sample.net"];

  const randomProtocol =
    protocols[Math.floor(Math.random() * protocols.length)];
  const randomDomain = domains[Math.floor(Math.random() * domains.length)];
  const randomPath = paths[Math.floor(Math.random() * paths.length)];
  const randomEmail = emails[Math.floor(Math.random() * emails.length)];

  // 随机决定是否包含email
  const includeEmail = Math.random() > 0.5;
  const emailPart = includeEmail ? `mailto:${randomEmail}` : "";

  return emailPart
    ? emailPart
    : `${randomProtocol}${randomDomain}${randomPath}`;
};

/**
 * 生成随机Base64编码的JPG图片，图片最大不超过400KB
 * @returns {string} - 生成的随机Base64编码的JPG图片
 */
const generateRandomBase64Image = (): string => {
  const maxSize = 400 * 1024; // 400KB in bytes
  const width = 800; // Width of the image
  const height = 600; // Height of the image
//   const numPixels = width * height;
  const bytesPerPixel = 4; // 4 bytes per pixel for RGBA

  // Ensure the image size does not exceed the maximum size
  const maxPixels = Math.floor(maxSize / bytesPerPixel);
  const actualWidth = Math.min(width, Math.sqrt(maxPixels));
  const actualHeight = Math.min(height, Math.floor(maxPixels / actualWidth));

  // Ensure actualWidth and actualHeight are valid numbers and greater than zero
  if (isNaN(actualWidth) || isNaN(actualHeight) || actualWidth <= 0 || actualHeight <= 0) {
    throw new Error("Invalid image dimensions");
  }

  // 使用 Uint8ClampedArray 替换 Uint8Array
  const pixelData = new Uint8ClampedArray(actualWidth * actualHeight * bytesPerPixel);
  for (let i = 0; i < pixelData.length; i += 4) {
    pixelData[i] = Math.floor(Math.random() * 256); // Red
    pixelData[i + 1] = Math.floor(Math.random() * 256); // Green
    pixelData[i + 2] = Math.floor(Math.random() * 256); // Blue
    pixelData[i + 3] = 255; // Alpha (fully opaque)
  }

  const canvas = document.createElement("canvas");
  canvas.width = actualWidth;
  canvas.height = actualHeight;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const imageData = new ImageData(pixelData, actualWidth, actualHeight);
    ctx.putImageData(imageData, 0, 0);
  }

  return canvas.toDataURL("image/jpeg");
};


/**
 * 生成模拟对象
 * 根据配置和ID生成一个包含随机数据的对象
 * 该函数用于创建具有特定格式的模拟数据，格式基于配置参数中指定的类型
 * 
 * @param config - 模拟实例的配置，决定了生成的对象中应包含的字段类型
 * @param id - 分配给生成对象的标识符
 * @returns 返回一个包含随机数据的模拟对象
 */
const generateMockObject = (
  config: IMockInstance["config"],
  id: number
): Record<string, any> => {
  const obj: Record<string, any> = Object.create(null);
  obj.id = id;
  // 每个类型出现一个字段
  if (config.objectFieldType!.includes("string")) {
    obj.string = generateRandomText(10, 20);
  }

  if (config.objectFieldType!.includes("url")) {
    obj.url = generateRandomUrl();
  }
  if (config.objectFieldType!.includes("time")) {
    obj.time = generateTimeString();
  }
  if (config.objectFieldType!.includes("color")) {
    obj.color = `#${generateRandomColor()}`;
  }
  if (config.objectFieldType!.includes("number")) {
    obj.number =
      Math.random() > 0.5
        ? (Math.random() * 1000000).toFixed(0)
        : (Math.random() * 100000).toFixed(3);
    obj.number = +obj.number;
  }
  if (config.objectFieldType!.includes("boolean")) {
    obj.boolean = Math.random() > 0.5;
  }

  if (config.objectFieldType!.includes("image")) {
    const imageUrl = `http://dummyimage.com/${generateRandomImageSize(
      200,
      1500,
      200,
      1500
    )}/${generateRandomColor()}`;
    obj.image = imageUrl;
  }
  if (config.objectFieldType!.includes("object")) {
    obj.object = {
      field1: Math.random().toString(36).substring(7),
      field2: Math.random() * 100,
      field3: Math.random() > 0.5,
    };
  }

  if (config.objectFieldType!.includes("array")) {
    obj.array = [
      Math.random().toString(36).substring(7),
      Math.random() * 100,
      Math.random() > 0.5,
    ];
  }
  if (config.objectFieldType!.includes("base64Image")) {
    obj.base64Image = generateRandomBase64Image();
  }

  return obj;
};

export { generateMockObject, generateRandomText, generateRandomTime, generateRandomImageSize, generateRandomColor, generateTimeString, generateRandomUrl, generateRandomBase64Image }