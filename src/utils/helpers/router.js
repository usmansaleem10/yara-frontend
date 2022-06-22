import { Calculator, AdminCrop, AdminProcote } from "@/components/index";
import { createRouter, createWebHistory } from "vue-router";

const routeInfos = [
  { path: "/", component: Calculator },
  { path: "/admin-crop", component: AdminCrop },
  { path: "/admin-procote", component: AdminProcote },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

export default router;
