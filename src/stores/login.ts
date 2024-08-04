import { defineStore } from 'pinia'
import { LOGIN_TOKEN } from '@/global/constants'
import { accountLogin, accountRegister, GetRoleMenuList } from "@/service/login/login"
import { mapMenusToRouters } from '@/utils/map-menus'
import { ElMessage } from 'element-plus'
import type { IAccount } from '@/types/account.type'
import router from '@/router/index'
import 'element-plus/es/components/message/style/css'

interface IState {
    token: string,
    roleid: number | null,
    roleMenuList: any[]
}

export const useLoginStore = defineStore('login', {
    state: (): IState => ({
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
        roleid: localStorage.getItem('roleid') ? Number(localStorage.getItem('roleid')) : null,
        roleMenuList: localStorage.getItem("menuList") ? JSON.parse(localStorage.getItem("menuList")!) : []
    }),
    actions: {
        // 登录
        async loginAccountAction(account: IAccount) {
            try {
                const res = await accountLogin(account)
                if (res.code === 200) {
                    ElMessage.success('登录成功')
                    const { token, roleid, userid } = res.data
                    this.token = token
                    this.roleid = roleid
                    localStorage.setItem(LOGIN_TOKEN, token)
                    localStorage.setItem('userid', userid)
                    localStorage.setItem('roleid', roleid)

                    const roleMenuListRes = await GetRoleMenuList(roleid)
                    this.roleMenuList = roleMenuListRes.res.menuList
                    localStorage.setItem('menuList', JSON.stringify(this.roleMenuList))

                    await this.loadRouter()
                    router.push('/main') // 跳转到 main 页面
                } else {
                    ElMessage.error(res.message)
                }
            } catch (error) {
                // ElMessage.error(`登录失败: ${error.message}`)
            }
        },
        // 加载路由
        async loadRouter() {
            if (!this.roleMenuList.length) return
            const routers = mapMenusToRouters(this.roleMenuList)
            routers.forEach(routerItem => router.addRoute('main', routerItem))
        },
        // 注册
        async registerAccountAction(account: IAccount) {
            try {
                const res = await accountRegister(account)
                if (res.code === 200) {
                    ElMessage.success('注册成功')
                } else {
                    ElMessage.error(res.message)
                }
            } catch (error) {
                // ElMessage.error(`注册失败: ${error.message}`)
            }
        }
    }
})
