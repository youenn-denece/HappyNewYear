import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from "../components/Home/Home.vue";
import Result from "../components/Result/Result.vue";


const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/result', name: 'Result', component: Result }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
