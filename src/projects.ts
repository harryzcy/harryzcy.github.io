import { createApp } from "vue";
import ProjectApp from "./Projects.vue";

declare global {
  var __VUE_OPTIONS_API__: boolean;
  var __VUE_PROD_DEVTOOLS__: boolean;
}

globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = false;

createApp(ProjectApp).mount("#app");
