


export interface UserList {
    userid: number
    username: string
    roleid?: number
    cellphone: string
    state: number
    departmentid?: number
    created_at: string
    updated_at: string
    realname: string,
    department_name: string,
    role_name: string
}
export interface GetUserListResonse {
    code: number
    totalCount: number
    message: string
    data: UserList[]
}
export interface DelteUserResonse {
    code: number
    message: string
}
export interface QueryData {
    offset: number;
    size: number;
    name?: string | null
    cellphone?: number | null
}
export interface QueryRoleData {
    offset: number;
    size: number;
}

export interface ICreateUser {
    username: string;
    realname: string;
    password: string | boolean;
    cellphone?: string;
    roleid?: string;
    departmentid?: string;
    state?: number | null;
}

export interface ICreateUserResonse {
    code: number
    message: string
    data: {}
}
