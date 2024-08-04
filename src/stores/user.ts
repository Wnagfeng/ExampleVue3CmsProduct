import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import { GetUserList, DelteUser, GetRoleList, GetDepartmentList, CreateUser, UpdateUser } from '@/service/user/index'
import type { QueryData, UserList, ICreateUser } from '@/types/user.type'
import type { RoleList } from '@/types/role.type'
import type { DepartmentList } from '@/types/department.typs'
interface Istate {
    UserList: UserList[],
    totalCount: number,
    RoleList: RoleList[],
    DepartmentList: DepartmentList[],
    queryData: {
        offset: number,
        size: number
    },

}
export const useUserStore = defineStore('userStore', {
    state: (): Istate => ({
        UserList: [],
        totalCount: 0,
        RoleList: [],
        DepartmentList: [],
        queryData: {
            offset: 0,
            size: 10
        },

    }),
    actions: {
        async FetchGetUserList(Quertdata?: QueryData) {
            3
            const res = await GetUserList(Quertdata)
  
            this.UserList = res.data
            this.totalCount = res.totalCount
        },
        async FetchDeleteUser(id: number) {
            const res = await DelteUser(id)
            if (res.code == 200) {
                this.UserList = []
                this.FetchGetUserList(this.queryData)
                ElMessage({
                    showClose: true,
                    message: '删除成功',
                    type: 'success',
                })
            }
        },
        async FetchGetRoleList() {
            const res = await GetRoleList()

            this.RoleList = res.data
        },
        async FetchGetDepartmentList() {
            const res = await GetDepartmentList()

            this.DepartmentList = res.data
        },
        async FetchCreateUser(data: ICreateUser) {
            const res = await CreateUser(data)
            if (res.code == 200) {
                this.UserList = []
                this.FetchGetUserList(this.queryData)
                ElMessage({
                    showClose: true,
                    message: '创建成功',
                    type: 'success',
                })
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error',
                })
            }
  
        },
        async FetchUpdateUser(id: number, data: ICreateUser) {
            const res = await UpdateUser(id, data)
            if (res.code == 200) {
                this.UserList = []
                this.FetchGetUserList(this.queryData)
                ElMessage({
                    showClose: true,
                    message: '更新成功',
                    type: 'success',
                })
            }
    
        }
    }

})
