import { defineStore } from 'pinia'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import { GetRoleList, DeleteRole, GetMenuList, GetRoleForId, PatchAndCreateRole } from '@/service/role/index'
import type { RoleList, QueryRoleData, MenuListData, IPatchAndCreateRole } from '@/types/role.type'
interface Istate {
    RoleList: RoleList[],
    queryData: {
        offset: number,
        size: number
    },
    totalCount: number,
    MenuListData: MenuListData[],
    RoleMenulist: []
}
export const useRoleStore = defineStore('RoleStore', {
    state: (): Istate => ({
        RoleList: [],
        queryData: {
            offset: 0,
            size: 10
        },
        totalCount: 0,
        MenuListData: [],
        RoleMenulist: []
    }),
    actions: {
        async FetchGetRoleList(QueryData?: QueryRoleData) {
            const res = await GetRoleList(QueryData)
            this.RoleList = res.res.data
            this.totalCount = res.res.totalCount
        },
        async DeleteRole(id: number) {
            console.log(id)
            const res = await DeleteRole(id)
            console.log(res)
            if (res.code === 200) {
                ElMessage({
                    showClose: true,
                    message: '删除成功',
                    type: 'success',
                })
                this.RoleList = []
                this.FetchGetRoleList()
            } else {
                ElMessage({
                    showClose: true,
                    message: "删除失败",
                    type: 'error',
                })
            }
        },
        async FetchGetMenuList() {
            const res = await GetMenuList()
            this.MenuListData = res.data
            console.log(res)
        },
        async FetchGetRoleForId(id: number) {
            const res = await GetRoleForId(id)
            return res.res.menuList
            // this.RoleMenulist = res.res.menuList
        },
        async FetchPatchAndCreateRole(RoleData: IPatchAndCreateRole) {
            const res = await PatchAndCreateRole(RoleData)
            if (res.res.success == true) {
                ElMessage({
                    showClose: true,
                    message: res.res.message,
                    type: 'success',
                })
                this.RoleList = []
                this.FetchGetRoleList()
            }
            else {
                ElMessage({
                    showClose: true,
                    message: res.res.message,
                    type: 'error',
                })
            }
            console.log(res)
        }
    }

})
