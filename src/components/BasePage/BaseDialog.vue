<template>
    <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="30%" center>
        <div class="form">
            <el-form :model="formData" label-width="80px" size="large">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="formData.username" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item label="真实姓名" prop="realname">
                    <el-input v-model="formData.realname" placeholder="请输入真实姓名" />
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="isCreate">
                    <el-input v-model="formData.password" placeholder="请输入密码" show-password />
                </el-form-item>
                <el-form-item label="手机号码" prop="cellphone">
                    <el-input v-model="formData.cellphone" placeholder="请输入手机号码" />
                </el-form-item>
                <el-form-item label="选择角色" prop="roleid">
                    <el-select v-model="formData.roleid" placeholder="请选择角色" style="width: 100%">
                        <el-option v-for="item in RoleList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="选择部门" prop="departmentid">
                    <el-select v-model="formData.departmentid" placeholder="请选择部门" style="width: 100%">
                        <el-option v-for="item in DepartmentList" :key="item.id" :label="item.name" :value="item.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="是否启用" prop="state" v-if="!isCreate">
                    <el-select v-model="formData.state" placeholder="请选择状态" style="width: 100%">
                        <el-option label="启用" :value="1" />
                        <el-option label="禁用" :value="0" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import 'element-plus/es/components/message/style/css'
import { useUserStore } from '@/stores/user'
import { encrypt } from '@/utils/jsencrypt'

const userStore = useUserStore()
const { RoleList, DepartmentList } = storeToRefs(userStore)

const centerDialogVisible = ref(false)
const isCreate = ref(false)
const EditUserID = ref<number>()

interface IformData {
    username: string
    realname: string
    password: string | boolean
    cellphone: string
    roleid: string
    departmentid: string
    state: number | null
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

const dialogTitle = computed(() => (isCreate.value ? '新建用户' : '编辑用户'))

const initializeFormData = (data?: IformData) => {
    if (data) {
        formData.value = {
            username: data.username || '',
            realname: data.realname || '',
            password: '',
            cellphone: data.cellphone || '',
            roleid: data.roleid || '',
            departmentid: data.departmentid || '',
            state: data.state !== null ? data.state : null
        }
    } else {
        formData.value = {
            username: '',
            realname: '',
            password: '',
            cellphone: '',
            roleid: '',
            departmentid: '',
            state: 0
        }
    }
}

const submitForm = () => {
    formData.value.password = encrypt(formData.value.password)
    if (isCreate.value) {
        userStore.FetchCreateUser(formData.value)
    } else if (EditUserID.value !== undefined) {
        userStore.FetchUpdateUser(EditUserID.value, formData.value)
    }
    centerDialogVisible.value = false
}

const changecenterDialogVisible = (isCreateState: boolean, UserID: number, Editdata?: IformData) => {
    isCreate.value = isCreateState
    centerDialogVisible.value = true
    EditUserID.value = isCreateState ? undefined : UserID
    initializeFormData(Editdata)
}

defineExpose({ changecenterDialogVisible })
</script>

<style scoped lang="less">
.form {
    padding: 20px;
}

.dialog-footer {
    text-align: right;
}

.el-dialog {
    width: 30%;
}
</style>