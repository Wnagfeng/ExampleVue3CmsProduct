<template>
    <div class="User">
        <BaseHeader :BaseHeaderConfig="BaseHeaderConfig" @query="handleQuery" @create="handleCreate"></BaseHeader>
        <BaseBody @delete="HandelDeleteUserData" @edit="HandelEditUserData"></BaseBody>
        <BaseDialog ref="UserBaseDialog"></BaseDialog>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import BaseHeader from '@/components/BasePage/BaseHeader.vue';
import BaseBody from '@/components/BasePage/BaseBody.vue';
import BaseDialog from '@/components/BasePage/BaseDialog.vue';
import { BaseHeaderConfig } from './user.config.ts'
import 'element-plus/es/components/message/style/css'
import { Top, Bottom, Tickets, EditPen } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { formatUtcString } from '@/utils/Fomart-Data-Time'
import { encrypt, decrypt } from '@/utils/jsencrypt'
const userStore = useUserStore()
const UserBaseDialog = ref()
const centerDialogVisible = ref(false)
const isCreate = ref(false)
const EditUserID = ref(0)
interface IformData {
    username: string
    realname: string
    password: string | boolean
    cellphone: string
    roleid: string
    departmentid: string
    state: number | null
}
export interface IEditdata {
    userid: number
    username: string
    roleid: number
    cellphone: string
    state: number
    departmentid: number
    created_at: string
    updated_at: string
    realname: string
    department_name: string
    role_name: string
}

const formData = ref<IformData>({
    username: '',
    realname: '',
    password: '',
    cellphone: '',
    roleid: '',
    departmentid: '',
    state: null
})

const currentPage = ref(1)
const pageSize = ref(10)
const queryParams = ref({
    name: '',
    cellphone: null
})
const Querydata = {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value,
    name: '',
    cellphone: null
}
const { UserList, totalCount, RoleList, DepartmentList } = storeToRefs(userStore)
const fetchUserList = () => {
    userStore.FetchGetUserList(Querydata)// 获取用户列表
    userStore.FetchGetRoleList()// 获取角色列表
    userStore.FetchGetDepartmentList()// 获取部门列表
}
onMounted(() => {
    fetchUserList()
})

const EditUserData = (row: any) => {
    isCreate.value = false
    centerDialogVisible.value = true
    formData.value = {
        username: row.username,
        realname: row.realname,
        password: '',
        cellphone: row.cellphone,
        roleid: row.roleid,
        departmentid: row.departmentid,
        state: row.state
    }
    EditUserID.value = row.userid
}



const handleQuery = (queryParams: { [key: string]: string }) => {
    console.log('Query Params:', queryParams)
}

const handleCreate = () => {
    UserBaseDialog.value.changecenterDialogVisible(true)
    console.log(UserBaseDialog.value)
    console.log("点击了创建按钮")
}
const HandelDeleteUserData = () => {

    console.log("删除用户")
}
const HandelEditUserData = (Editdata: IEditdata) => {
    const EditUserID = Editdata.userid
    UserBaseDialog.value.changecenterDialogVisible(false, EditUserID, Editdata)
}




</script>

<style scoped lang="less">
.User {
    display: flex;
    flex-direction: column
}
</style>
