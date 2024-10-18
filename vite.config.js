import path from "node:path";
import { defineConfig } from "vite";

module.exports = defineConfig({
  build: {
    target: ['es2020'],
    lib: {
      entry: path.resolve(__dirname, 'src/waveform-path.js'),
      name: 'waveform-path',
      formats: ["es", "umd"],
      fileName: (format) => `waveform-path.${format}.js`
    }
 }
});