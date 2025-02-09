# ezzMock 使用文档

## 简介

`ezzMock` 是一个基于 TypeScript 的数据模拟（mock）库，旨在为开发者提供简单、易于使用、灵活的接口来生成随机的模拟数据进行开发测试。它支持多种数据类型进行随机生成（如字符串段落、数字、布尔值、对象、数组、url、图片、base64 图片、时间、颜色），并允许用户基本不需要学习任何规则模版就可以通过简单的几个配置自定义模拟数据的行为。此外，`ezzMock` 还提供了模拟轮询的功能。

## 安装

### 使用 npm 安装

```bash
npm install ezzmock
```

### 直接引入脚本文件

你也可以直接在 HTML 文件中引入编译后的 `ezzmock.min.js` 文件：

```html
<script src="./dist/ezzmock.min.js"></script>
```

## 快速开始

### 创建模拟数据

你可以直接通过调用 `Mock()` 方法来创建模拟数据，这个方法就像 axios 它返回一个 promise。
可以传入 config，`config` 参数是一个可选的对象，用于配置模拟数据的行为，当然也可以不传。以下是一个简单的例子：

```javascript
// 引入 ezzmock 库
import { Mock } from "ezzmock";

// 配置参数
const config = {
  isObject: false,
  log: true,
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

// 创建模拟数据
Mock(config)
  .then((response) => {
    console.log("模拟数据:", response);
  })
  .catch((error) => {
    console.error("模拟失败:", error);
  });
```

### 模拟轮询

`ezzMock` 提供了 `Polling` 方法来模拟轮询请求。你可以通过传递一个配置对象来控制轮询的行为。以下是一个简单的例子：

```javascript
// 引入 ezzmock 库
import { Polling } from "ezzmock";

// 轮询配置
const pollingConfig = {
  pollingInterval: 2, // 每次轮询间隔时间（秒）
  maxPollingAttempts: 5, // 最大轮询次数
  data: {
    userName: "xxx",
    age: 12,
    id: 123123,
  },
};

// 执行轮询
Polling(pollingConfig)
  .then((response) => {
    console.log("轮询成功:", response);
  })
  .catch((error) => {
    console.error("轮询失败:", error.message);
  });
```

## 配置选项

### Mock 配置（配置都是可选，按需传入）

| 属性名             | 类型     | 默认值   | 描述                                                                                                                                                   |
| ------------------ | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isObject           | boolean  | false    | 是否返回单个对象，比如用于单个表单的数据回显                                                                                                           |
| log                | boolean  | false    | 是否打印日志                                                                                                                                           |
| maxRadomTime       | number   | 3        | 随机延迟的最大时间（秒）                                                                                                                               |
| onlyReject         | boolean  | false    | 是否只触发 reject。不返回数据 只进行报错                                                                                                               |
| isRadomStatus      | boolean  | true     | 是否随机返回成功的状态或失败状态                                                                                                                       |
| isObjectArray      | boolean  | true     | 是否返回对象数组 。可用于表格开发的数据回显                                                                                                            |
| objectFieldType    | string[] | 见默认值 | 需要生成的字段类型列表, 根据类型数据生成对应类型的内容，支持 "string", "number", "boolean","object","array","url","image","time","color","base64Image" |
| maxObjectArraySize | number   | 500      | 当 isObjectArray 为 true 时使用，成功后返回的对象数组的条数                                                                                            |

#### objectFieldType 说明

string：
最小 1 个字符到 200 个字符随机混合中英文 特殊字符 空格

base64Image：
1 。如果不配置这个参数，默认所有类型都生成
2 。配置默认不带 base64Image，需要手动加入，返回的 base64 默认大小不超过 400kb
image：
随机大小颜色的 url 生成的图最小宽高是 200，最大宽高是 1500，在这个范围的随机尺寸

### Polling 配置 （配置都是可选，按需传入）

| 属性名             | 类型   | 默认值    | 描述                                   |
| ------------------ | ------ | --------- | -------------------------------------- |
| pollingInterval    | number | 2         | 每次轮询间隔时间（秒）                 |
| maxPollingAttempts | number | 5         | 最大轮询次数                           |
| data               | object | undefined | 可不传，自定义的数据，轮询成功后会返回 |

## 示例代码

### HTML 示例

以下是一个完整的 HTML 示例，展示了如何使用 `ezzMock` 来生成模拟数据和执行轮询：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ezzMock Demo</title>
  </head>
  <body>
    <h1>ezzMock Demo</h1>
    <button id="mockButton">Run Mock</button>
    <button id="pollingButton">Run Polling</button>
    <pre id="output"></pre>

    <!-- 引入 ezzmock 库 -->
    <script src="./dist/ezzmock.min.js"></script>
    <script>
      document.getElementById("mockButton").addEventListener("click", () => {
        window.ezzmock
          .Mock({
            isRadomStatus: true,
            onlyReject: false,
            isObjectArray: true,
            log: true,
            objectFieldType: [
              "string",
              "url",
              "image",
              "time",
              "color",
              "number",
            ],
          })
          .then((response) => {
            document.getElementById("output").textContent = JSON.stringify(
              response,
              null,
              2
            );
          });
      });

      document.getElementById("pollingButton").addEventListener("click", () => {
        const pollingConfig = {
          pollingInterval: 2, // 2秒
          maxPollingAttempts: 5, // 最大5次
          data: {
            userName: "xxx",
            age: 12,
            id: 123123,
          },
        };
        window.ezzmock
          .Polling(pollingConfig)
          .then((response) => {
            document.getElementById("output").textContent = JSON.stringify(
              response,
              null,
              2
            );
          })
          .catch((error) => {
            document.getElementById("output").textContent = error.message;
          });
      });
    </script>
  </body>
</html>
```

## 构建与发布

### 构建

使用 Rollup 构建项目：

```bash
npm run build
```

这将生成一个 UMD 格式的 `ezzmock.min.js` 文件，并将其放置在 `dist` 目录下。

### 发布

确保你的项目已经构建完成，并且所有必要的文件都已准备好。然后，你可以通过 npm 发布你的包：

```bash
npm publish
```

## 许可证

`ezzMock` 采用 MIT 许可证。更多信息请参见 [LICENSE](./LICENSE) 文件。

---

希望这份文档能帮助你快速上手 `ezzMock`！如果你有任何问题或建议，请随时提交 Issue 或 Pull Request。

引用：通义灵码、dummyimage.com
