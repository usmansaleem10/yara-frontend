import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/index.css";
import VueApexCharts from "vue3-apexcharts";
import router from "@/utils/helpers/router.js";
createApp(App).use(VueApexCharts).use(router).mount("#app");
