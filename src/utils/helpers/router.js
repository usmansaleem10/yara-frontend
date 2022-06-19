import { Calculator, Admin } from "@/components/index";
import { createRouter, createWebHistory } from "vue-router";

const routeInfos = [
  { path: "/", component: Calculator },
  { path: "/admin", component: Admin },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routeInfos,
});

export default router;
