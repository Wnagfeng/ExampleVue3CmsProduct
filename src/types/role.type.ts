export interface RoleList {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
}

export interface GetRoleLisrResponse {
    code: number
    data: RoleList[]
    totalCount: number
}

export interface QueryRoleData {
    offset: number;
    size: number;
    name?: string;
}
export interface IPatchAndCreateRole {
    name: string
    intro: string
    menuList: number[]
}


export interface Res {
    success: boolean
    roleId: number
    message: string
}

export interface PatchAndCreateRoleResponse {
    code: number
    res: Res
}

export interface MenuListData {
    id: number
    name: string
    type: number
    url: string
    icon: string
    sort: number
    createAt: string
    updateAt: string
    children: MenuListData[]
}
export interface MenuListresponse {
    code: number
    data: MenuListData[]
}





