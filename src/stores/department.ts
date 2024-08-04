import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import { GetDepartmentList, DeleteDepartment, UpdateDepartment, CreateDepartment } from '@/service/department/department'
import type { DepartmentListData, QueryDepartmentData, UpdateDepartmentData } from '@/types/department.type'
interface Istate {
    DepartmentListData: DepartmentListData[],
    queryData: {
        offset: number,
        size: number
    },
    totalCount: number
}
export const useDepartmentStore = defineStore('DepartmentStore', {
    state: (): Istate => ({
        DepartmentListData: [],
        queryData: {
            offset: 0,
            size: 10
        },
        totalCount: 0
    }),
    actions: {
        async FetchCreateDepartment(DepartmentData: UpdateDepartmentData) {
            const res = await CreateDepartment(DepartmentData)
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '创建成功',
                    type: 'success',
                })
                this.DepartmentListData = []
                this.FetchGetDepartmentList()
            } else {
                ElMessage({
                    showClose: true,
                    message: "创建失败",
                    type: 'error',
                })
            }
        },
        async FetchGetDepartmentList(QueryData?: QueryDepartmentData) {
  
            const res = await GetDepartmentList(QueryData)
            this.DepartmentListData = res.data
            this.totalCount = res.totalCount
        },
        async DeleteDepartment(id: number) {
  
            const res = await DeleteDepartment(id)
  
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '删除成功',
                    type: 'success',
                })
                this.DepartmentListData = []
                this.FetchGetDepartmentList()
            } else {
                ElMessage({
                    showClose: true,
                    message: "删除失败",
                    type: 'error',
                })
            }
        },
        async UpdateDepartment(id: number, DepartmentData: UpdateDepartmentData) {

            const res = await UpdateDepartment(id, DepartmentData)
            if (res.code == 200) {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'success',
                })
                this.DepartmentListData = []
                this.FetchGetDepartmentList()
            }
            else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error',
                })
            }
        }
    }

})
