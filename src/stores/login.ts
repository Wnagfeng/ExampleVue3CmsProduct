import { defineStore } from 'pinia'
import { LOGIN_TOKEN } from '@/global/constants'
import { accountLogin, accountRegister } from "@/service/login/login"
import { ElMessage } from 'element-plus';
import type { IAccount } from '@/types/account.type'
import router from '@/router/index'
import 'element-plus/es/components/message/style/css'
interface Istate {
    token: string
}
export const useLoginStore = defineStore('login', {
    state: (): Istate => ({
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
    }),
    actions: {
        // 登录
        async loginAccountAction(account: IAccount) {
            console.log("接受的登录数据为：", account)
            const res = await accountLogin(account)
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '登录成功',
                    type: 'success',
                })
                const { token } = res.data
                this.token = token
                localStorage.setItem(LOGIN_TOKEN, token)
                router.push('/main') // 跳转到 main 页面
            }
            else {
                ElMessage({
                    showClose: true,
                    message: `${res.message}`,
                    type: 'error',
                })
            }


        },
        // 注册
        async registerAccountAction(account: IAccount) {
            const res = await accountRegister(account)
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '注册成功',
                    type: 'success',
                })
            }
            else {
                ElMessage({
                    showClose: true,
                    message: `${res.message}`,
                    type: 'error',
                })
            }
        }
    }
})
