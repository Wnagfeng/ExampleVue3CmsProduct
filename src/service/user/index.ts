import wfrequest from "../index";
import type { QueryData, GetUserListResonse, DelteUserResonse, QueryRoleData, ICreateUser, ICreateUserResonse } from '@/types/user.type'
import type { GetRoleLisrResponse } from '@/types/role.type'
import type { GetDepartmentListResponse } from '@/types/department.typs'
export function GetUserList(QueryData?: QueryData) {
    return wfrequest.post<GetUserListResonse>({
        url: "/user/list",
        data: QueryData
    })
}
export function DelteUser(id: number) {
    return wfrequest.delete<DelteUserResonse>({
        url: "/user/" + id
    })
}
export function GetRoleList(QueryData?: QueryRoleData) {
    return wfrequest.post<GetRoleLisrResponse>({
        url: "/role/list",
        data: QueryData
    })
}
export function GetDepartmentList() {
    return wfrequest.post<GetDepartmentListResponse>({
        url: "/department/list"
    })
}
export function CreateUser(data: ICreateUser) {
    return wfrequest.post<ICreateUserResonse>({
        url: "/user",
        data
    })
}
export function UpdateUser(id: number, data: ICreateUser) {
    return wfrequest.patch<ICreateUserResonse>({
        url: "/user/" + id,
        data
    })
}