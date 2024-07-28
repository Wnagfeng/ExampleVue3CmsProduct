import { createRouter, createWebHistory } from "vue-router";
import main from "@/views/main.vue";
import { LOGIN_TOKEN } from '@/global/constants'
import { ElMessage } from 'element-plus';

const routes = [
  {
    path: "/main",
    redirect: '/main/analysis/dashboard'

  },
  {
    path: "/main",
    name: "main",
    component: main,
    children: [
      {
        path: '/main/analysis/dashboard',
        name: 'dashboard',
        component: () => import("@/views/analysis/dashboard/dashboard.vue"),
      },
      {
        path: '/main/system/user',
        name: 'user',
        component: () => import("@/views/system/user/user.vue"),
      },
      {
        path: '/main/system/role',
        name: 'role',
        component: () => import("@/views/system/role/role.vue"),
      },
      {
        path: '/main/system/menu',
        name: 'menu',
        component: () => import("@/views/system/menu/menu.vue"),
      },
      {
        path: '/main/system/department',
        name: 'department',
        component: () => import("@/views/system/department/department.vue"),
      },
      {
        path: '/main/product/category',
        name: 'category',
        component: () => import("@/views/product/category/category.vue"),
      },
      {
        path: '/main/product/goods',
        name: 'goods',
        component: () => import("@/views/product/goods/goods.vue"),
      }
    ]
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
    path: "/403",
    name: "403",
    component: () => import("@/views/pages/403.vue")
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/pages/404.vue")
  },
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
})

export default router;

