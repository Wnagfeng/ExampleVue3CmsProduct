import { defineStore } from 'pinia'
import { localCache } from '@/utils/Cache'
import { LOGIN_TOKEN, USER_INFO } from '@/global/constants'
import { accountLogin } from "@/service/login/login"
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
interface Istate {
    token: string
    userinfo: any
}
interface IAccount {
    username: string
    password: string
}


export const useLoginStore = defineStore('login', {
    state: (): Istate => ({
        token: localStorage.getItem(LOGIN_TOKEN) ?? '',
        userinfo: localCache.getCache(USER_INFO) ?? {},
    }),

    actions: {
        async loginAccountAction(account: IAccount) {
            console.log("接受的登录数据为：", account)
            const res = await accountLogin(account)
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '登录成功',
                    type: 'success',
                })
                const { token, UserName, UserID } = res.data
                this.token = token
                const userinfo = {
                    UserName,
                    UserID,
                }
                this.userinfo = userinfo

            }
            else {
                ElMessage({
                    showClose: true,
                    message: `${res.message}`,
                    type: 'error',
                })
            }


        },
    }
})
