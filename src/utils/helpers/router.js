import { Calculator, AdminCrop } from "@/components/index";
import { createRouter, createWebHistory } from "vue-router";

const routeInfos = [
  { path: "/", component: Calculator },
  { path: "/admin-crop", component: AdminCrop },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

export default router;
