# ezMock 使用文档

## 简介

`ezMock` 是一个基于 TypeScript 的数据模拟库，旨在为开发者提供灵活且易于使用的接口来生成随机的模拟数据。它支持多种数据类型（如字符串、数字、布尔值、对象、数组等），并允许用户通过配置自定义模拟数据的行为。此外，`ezMock` 还提供了轮询功能，用于模拟异步请求。

## 安装

### 使用 npm 安装

```bash
npm install ezmock
```

### 直接引入脚本文件

你也可以直接在 HTML 文件中引入编译后的 `ezMock.min.js` 文件：

```html
<script src="./dist/ezMock.min.js"></script>
```

## 快速开始

### 创建模拟数据

你可以通过调用 `ezMock.Mock(config)` 方法来创建模拟数据。`config` 参数是一个可选的对象，用于配置模拟数据的行为。以下是一个简单的例子：

```javascript
// 引入 ezMock 库
import { Mock } from "ezmock";

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

`ezMock` 提供了 `Polling` 方法来模拟轮询请求。你可以通过传递一个配置对象来控制轮询的行为。以下是一个简单的例子：

```javascript
// 引入 ezMock 库
import { Polling } from "ezmock";

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

### Mock 配置

| 属性名             | 类型     | 默认值   | 描述                                                    |
| ------------------ | -------- | -------- | ------------------------------------------------------- |
| isObject           | boolean  | false    | 是否返回单个对象                                        |
| log                | boolean  | false    | 是否打印日志                                            |
| maxRadomTime       | number   | 3        | 随机延迟的最大时间（秒）                                |
| onlyReject         | boolean  | false    | 是否只触发 reject                                       |
| isRadomStatus      | boolean  | true     | 是否随机决定 resolve 或 reject                          |
| isObjectArray      | boolean  | true     | 是否返回对象数组                                        |
| objectFieldType    | string[] | 见默认值 | 对象字段类型列表，支持 "string", "number", "boolean" 等 |
| maxObjectArraySize | number   | 500      | 对象数组的最大长度                                      |

### Polling 配置

| 属性名             | 类型   | 默认值 | 描述                   |
| ------------------ | ------ | ------ | ---------------------- |
| pollingInterval    | number | 2      | 每次轮询间隔时间（秒） |
| maxPollingAttempts | number | 5      | 最大轮询次数           |
| data               | object | {}     | 初始数据               |

## 示例代码

### HTML 示例

以下是一个完整的 HTML 示例，展示了如何使用 `ezMock` 来生成模拟数据和执行轮询：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ezMock Demo</title>
  </head>
  <body>
    <h1>ezMock Demo</h1>
    <button id="mockButton">Run Mock</button>
    <button id="pollingButton">Run Polling</button>
    <pre id="output"></pre>

    <!-- 引入 ezMock 库 -->
    <script src="./dist/ezMock.min.js"></script>
    <script>
      document.getElementById("mockButton").addEventListener("click", () => {
        window.ezMock
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
        window.ezMock
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

这将生成一个 UMD 格式的 `ezMock.min.js` 文件，并将其放置在 `dist` 目录下。

### 发布

确保你的项目已经构建完成，并且所有必要的文件都已准备好。然后，你可以通过 npm 发布你的包：

```bash
npm publish
```

## 许可证

`ezMock` 采用 MIT 许可证。更多信息请参见 [LICENSE](./LICENSE) 文件。

---

希望这份文档能帮助你快速上手 `ezMock`！如果你有任何问题或建议，请随时提交 Issue 或 Pull Request。
