import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "waveform-path",
      formats: ["es", "umd"],
      fileName: (format) => `waveform-path.${format}.js`,
    },
  },
  plugins: [dts({ rollupTypes: true })],
});
