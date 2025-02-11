import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: false,
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/types/index.d.ts",
      format: "esm",
    },
    plugins: [dts()],
  },
];
