export interface DepartmentList {
    id: number
    name: string
    type: any
    leader: string
    parentid?: number
    createAt: string
    updateAt: string
}
export interface GetDepartmentListResponse {
    code: number
    totalCount: number
    message: string
    data: DepartmentList[]
}