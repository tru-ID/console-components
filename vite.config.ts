import reactRefresh from "@vitejs/plugin-react-refresh";
import path from "path";
import typescript2 from "rollup-plugin-typescript2";
import { defineConfig } from "vite";
import pkg from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "lib/index.ts"),
      name: "tru_console_components",
      formats: ["es"],
      fileName: "index",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        ...Object.keys(pkg.peerDependencies),
        ...Object.keys(pkg.dependencies),
      ],
      plugins: [
        {
          ...typescript2({
            check: false,
            tsconfig: path.resolve(__dirname, "tsconfig.json"),
            tsconfigOverride: {
              compilerOptions: {
                sourceMap: false,
                declaration: true,
                declarationMap: true,
              },
              exclude: ["src"],
            },
          }),
        },
      ],
    },
  },
});
