import wfrequest from "../index";
import type { QueryDepartmentData, GetDepartmentListResponse, DepartmentCreateData, UpdateDepartmentData } from '@/types/department.type'
export function GetDepartmentList(QueryData?: QueryDepartmentData) {
    return wfrequest.post<GetDepartmentListResponse>({
        url: "/department/list",
        data: QueryData
    })
}
export function CreateDepartment(CreateData: DepartmentCreateData) {
    return wfrequest.post({
        url: "/department",
        data: CreateData
    })
}
export function DeleteDepartment(id: number) {
    return wfrequest.delete({
        url: `/department/${id}`
    })
}

export function UpdateDepartment(id: number, UpdateData: UpdateDepartmentData) {
    return wfrequest.patch({
        url: `/department/${id}`,
        data: UpdateData
    })
}