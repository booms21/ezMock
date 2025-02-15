import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: "src/main/ezzmock.ts",
  output: {
    file: "dist/ezzmock.min.js",
    format: "umd",
    name: "ezzmock", // 确保名称正确
    globals: {},
    sourcemap: true,
    exports: "named", // 确保命名导出
  },
  plugins: [typescript(), resolve(), commonjs(), terser()],
};
export default config;
