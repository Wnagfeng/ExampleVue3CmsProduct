import wfrequest from "../index";

import type { GetRoleLisrResponse, QueryRoleData, IPatchAndCreateRole, PatchAndCreateRoleResponse, MenuListresponse } from '@/types/role.type'

export function GetRoleList(QueryData?: QueryRoleData) {
    return wfrequest.post<GetRoleLisrResponse>({
        url: "/role/list",
        data: QueryData
    })
}
export function DeleteRole(roleId: number) {
    return wfrequest.delete({
        url: "/role/" + roleId,
    })
}
export function PatchAndCreateRole(RoleData: IPatchAndCreateRole) {
    return wfrequest.post<PatchAndCreateRoleResponse>({
        url: "/role",
        data: RoleData
    })
}
export function GetMenuList() {
    return wfrequest.get<MenuListresponse>({
        url: "/menu"
    })
}

export function GetRoleForId(Roleid: number) {
    return wfrequest.get({
        url: "/role/" + Roleid + "/menu"
    })
}