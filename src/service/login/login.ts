import wfrequest from '../index'
import type { IAccount } from '@/types/account.type'

export function accountLogin(account: IAccount) {
    return wfrequest.post({
        url: '/login',
        data: account
    })
}
export function accountRegister(account: IAccount) {
    return wfrequest.post({
        url: "/register",
        data: account
    })
}
export function testLogin() {
    return wfrequest.get({
        url: "/testlogin"
    })
}
export function GetRoleMenuList(id: number) {
    return wfrequest.get({
        url: "/role/" + id + "/menu"
    })
}