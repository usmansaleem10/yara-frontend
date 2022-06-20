import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/index.css";
import VueApexCharts from "vue3-apexcharts";
import router from "@/utils/helpers/router.js";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
createApp(App)
  .use(VueApexCharts)
  .use(router)
  .use(VueToast, {
    position: "top",
  })
  .mount("#app");
