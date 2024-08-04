export interface DepartmentList {
    id: number
    name: string
    type: any
    leader: string
    parentid?: number
    createAt: string
    updateAt: string
}
export interface Data {
    totalCount: number
    data: DepartmentList[]
}

export interface GetDepartmentListResponse {
    code: number
    message: string
    data: DepartmentList[]
}