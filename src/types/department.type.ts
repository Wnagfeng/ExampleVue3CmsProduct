export interface QueryDepartmentData {
    offset: number;
    size: number;
    name?: string;
    leader?: string;
}


export interface DepartmentListData {
    id: number
    name: string
    type: any
    leader: string
    parentid: number
    createAt: string
    updateAt: string
}
export interface Data {
    totalCount: number
    data: DepartmentListData[]
}

export interface GetDepartmentListResponse {
    code: number
    message: string
    totalCount: number
    data: DepartmentListData[]
}
export interface DepartmentCreateData {
    name: string
    parentid: number | null;
    leader: string
}

export interface UpdateDepartmentData {
    name: string
    parentid: number | null;
    leader: string
}


