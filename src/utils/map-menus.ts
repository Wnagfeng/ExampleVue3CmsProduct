import type { RouteRecordRaw } from 'vue-router'

/**
 * author: Joon
 * time: 2024/08/04
 * @interface fristRouterUrlType
 * @description 定义第一个路由 URL 对象的接口
 * @property {number} id - 路由 ID
 * @property {string} url - 路由 URL
 * @property {string} name - 路由名称
 * @property {number} sort - 排序顺序
 * @property {number} type - 路由类型
 * @property {any} [children] - 子路由对象
 * @property {number} parentId - 父级路由 ID
 */
export interface fristRouterUrlType {
  id: number;
  url: string;
  name: string;
  sort: number;
  type: number;
  children?: any;
  parentId: number;
}

/**
 * @function loadLocalRouters
 * @description 动态加载指定目录下的本地路由模块
 * @returns {RouteRecordRaw[]} 本地路由记录的数组
 */
export function loadLocalRouters() {
  const localRouters: RouteRecordRaw[] = []
  const files: Record<string, any> = import.meta.glob(
    '../router/Main/**/*.ts',
    { eager: true }
  )
  for (const key in files) {
    const module = files[key]
    localRouters.push(module.default)
  }
  return localRouters
}

/**
 * @var {fristRouterUrlType | null} fristRouterUrl - 存储第一个匹配的子菜单 URL 对象
 */
export let fristRouterUrl: fristRouterUrlType | null = null

/**
 * @function mapMenusToRouters
 * @description 根据加载的本地路由，将用户菜单映射到路由配置
 * @param {any[]} usermenu - 用户菜单对象数组
 * @returns {RouteRecordRaw[]} 匹配的路由记录数组
 */
export function mapMenusToRouters(usermenu: any[]) {
  const localRouters = loadLocalRouters()
  const rouers: RouteRecordRaw[] = []

  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      const route = localRouters.find((item) => item.path === submenu.url)
      if (route) {
        if (!rouers.find((item) => item.path === menu.url)) {
          rouers.push({ path: menu.url, redirect: route.path })
        }
        rouers.push(route)
      }

      if (fristRouterUrl === null && route) {
        fristRouterUrl = submenu
      }
    }
  }

  return rouers
}

/**
 * @function mapPathtoUsermenus
 * @description 根据给定的路径找到对应的用户菜单 ID
 * @param {any} path - 路径
 * @param {any[]} usermenu - 用户菜单对象数组
 * @returns {number | undefined} 对应的用户菜单 ID
 */
export function mapPathtoUsermenus(path: any, usermenu: any) {
  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu.id
      }
    }
  }
}

/**
 * @interface IBreadcrumb
 * @description 定义面包屑路径的接口
 * @property {any} name - 路径名称
 * @property {any} path - 路径
 */
interface IBreadcrumb {
  name: any
  path: any
}

/**
 * @function mapPathToBreadcrumbName
 * @description 根据用户菜单将给定路径映射到面包屑路径
 * @param {any} path - 当前路由路径
 * @param {any[]} usermenu - 用户菜单对象数组
 * @returns {IBreadcrumb[]} 面包屑数组
 */
export function mapPathToBreadcrumbName(path: any, usermenu: any) {
  const Breadcrumb: IBreadcrumb[] = []
  for (const menu of usermenu) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        Breadcrumb.push({ name: menu.name, path: menu.url })
        Breadcrumb.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return Breadcrumb
}

/**
 * @function mapUsermenutoPermissions
 * @description 从用户菜单中提取权限
 * @param {any[]} usermenu - 用户菜单对象数组
 * @returns {any[]} 用户的权限数组
 */
export function mapUsermenutoPermissions(usermenu: any[]) {
  let Permissions: any = []

  /**
   * @function mapPermissions
   * @description 递归解析用户权限
   * @param {any[]} menus - 菜单数组
   */
  function mapPermissions(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        mapPermissions(item.children)
      } else {
        if (item.permission) {
          Permissions.push(item.permission)
        }
      }
    }
  }

  mapPermissions(usermenu)
  return Permissions
}
