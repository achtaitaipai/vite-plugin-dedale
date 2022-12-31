import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import esbuild from "rollup-plugin-esbuild";

export default [
  {
    input: `src/index.ts`,
    plugins: [resolve(), json(), commonjs(), esbuild()],
    output: [
      {
        file: "dist/index.js",
        format: "es",
      },
    ],
  },
  {
    input: `src/index.ts`,
    plugins: [dts()],
    output: {
      file: `dist/index.d.ts`,
      format: "es",
    },
  },
];
