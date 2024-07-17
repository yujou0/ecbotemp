import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import Pages from "vite-plugin-pages";
import Layouts from "vite-plugin-vue-layouts";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/EC_Back/', // 新增这一行，指定基础路径为 '/NEWTEST/'
  // base: '/', // 新增这一行，指定基础路径为 '/NEWTEST/'
  // base: '/rd.e-commerce/ec_backoffice.website/feature/41035/',
  base: '/',
  plugins: [
    vue(),
    Pages(),
    Layouts(),
    AutoImport({
      //告訴vite哪些plugin的api要自動引入
      imports: ["vue", "vue-router", "vue-i18n"],
      dts: "src/auto-imports.js",
    }),
    Components({
      // 從 `./src/components/` 路徑查找
      extensions: ["vue"],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: "src/auto-components.js",
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      symbolId: "[dir]/[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // vue$: 'vue/dist/vue.runtime.esm.js'
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/styles/main.scss";
        `
      }
    },
    extract: true 
  }
  
});
