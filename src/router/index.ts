import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/main.vue";
import { LOGIN_TOKEN } from '@/global/constants'
import { ElMessage } from 'element-plus';
import { fristRouterUrl } from '@/utils/map-menus'
const routes = [
  {
    path: "/main",
    redirect: '/main/analysis/dashboard'

  },
  {
    path: "/",
    redirect: '/main/analysis/dashboard'

  },
  {
    path: "/main",
    name: "main",
    component: main
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/pages/login.vue")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/pages/register.vue")
  },
  {
    path: "/reset-pwd",
    name: "reset-pwd",
    component: () => import("@/views/pages/reset-pwd.vue")
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('@/views/pages/403.vue')
  }
];


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach(async (to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localStorage.getItem(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    ElMessage({
      showClose: true,
      message: '登录失效！',
      type: 'error',
    })
    return '/login'
  }
  if (to.path === '/main') {
    return fristRouterUrl?.url
  }
})

export default router;

