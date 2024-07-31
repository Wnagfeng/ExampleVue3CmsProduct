export interface RoleList {
    id: number
    name: string
    intro: string
    createAt: string
    updateAt: string
}

export interface GetRoleLisrResponse {
    code: number
    res: RoleList[]
}


