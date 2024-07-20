import wfrequest from '../index'
interface IAccount {
    username: string
    password: string
}
export function accountLogin(account: IAccount) {
    return wfrequest.post({
        url: '/login',
        data: account
    })
}