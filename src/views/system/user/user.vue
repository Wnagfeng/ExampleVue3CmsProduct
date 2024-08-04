<template>
    <div class="userWrapper">
        <div class="header">
            <el-form :inline="true" :model="queryParams" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="queryParams.name" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="queryParams.cellphone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleQuery">查询</el-button>
                </el-form-item>
            </el-form>
            <div class="actions">
                <el-button type="success" @click="handleImport" class="action_btn">
                    <el-icon>
                        <Top />
                    </el-icon>
                    <div class="tex">导入</div>
                </el-button>
                <el-button type="success" @click="handleCreate" class="action_btn">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    <div class="tex">新建</div>
                </el-button>
                <el-button type="warning" @click="handleExport" class="action_btn">
                    <el-icon>
                        <Bottom />
                    </el-icon>
                    <div class="tex">导出</div>
                </el-button>
                <el-button type="info" @click="handlePrint" class="action_btn">
                    <el-icon>
                        <Tickets />
                    </el-icon>
                    <div class="tex">打印</div>
                </el-button>
            </div>
        </div>
        <div class="body">
            <el-table :data="UserList" border fit style="width: 100%">
                <el-table-column prop="userid" label="Id" min-width="60" align="center" />
                <el-table-column prop="username" label="用户名" min-width="150" align="center" flex="1" />
                <el-table-column prop="cellphone" label="手机号码" min-width="150" align="center" flex="1" />
                <el-table-column prop="role_name" label="角色" min-width="100" align="center" flex="1" />
                <el-table-column prop="department_name" label="部门" min-width="130" align="center" flex="1" />
                <el-table-column prop="state" label="状态" min-width="105" align="center" flex="1">
                    <template #default="scope">
                        <el-button :type="scope.row.state === 1 ? 'success' : 'danger'" plain>
                            {{ scope.row.state === 1 ? '启用' : '禁用' }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="realname" label="真实姓名" min-width="110" align="center" flex="1" />
                <el-table-column prop="created_at" label="创建时间" min-width="170" align="center" flex="1">
                    <template #default="scope">
                        {{ formatUtcString(scope.row.created_at) }}
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="修改时间" min-width="170" align="center" flex="1">
                    <template #default="scope">
                        {{ formatUtcString(scope.row.updated_at) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="165px">
                    <template #default="scope">
                        <el-button type="success" plain @click="EditUserData(scope.row)">
                            编辑
                        </el-button>
                        <el-button type="danger" plain @click="deleteClick(scope.row.userid)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="centerDialogVisible" :title="isCreate ? '新建用户' : '编辑用户'" width="30%" center>
            <div class="form">
                <el-form :model="formData" label-width="80px" size="large">
                    <el-form-item label="用户名" prop="name">
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
                    <el-form-item label="选择角色" prop="roleId">
                        <el-select v-model="formData.roleid" placeholder="请选择角色" style="width: 100%">
                            <template v-for="item in RoleList">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择部门" prop="departmentId">
                        <el-select v-model="formData.departmentid" placeholder="请选择部门" style="width: 100%">
                            <template v-for="item in DepartmentList">
                                <el-option :label="item.name" :value="item.id" />
                            </template>
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
                    <el-button type="primary" @click="entercenterDialogVisible">
                        确定
                    </el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css'
import { Top, Bottom, Tickets, EditPen } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { formatUtcString } from '@/utils/Fomart-Data-Time'
import { encrypt } from '@/utils/jsencrypt'
const userStore = useUserStore()
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
userStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name == 'FetchUpdateUser' ||
            name == 'FetchDeleteUser'
        ) {
            currentPage.value = 1
        }
    })
});
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

onMounted(() => {
    userStore.FetchGetUserList(Querydata)
    userStore.FetchGetRoleList()
    userStore.FetchGetDepartmentList()
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
const deleteClick = (id: number) => {
    userStore.FetchDeleteUser(id)

}
const handleSizeChange = (size: number) => {
    pageSize.value = size;
    Querydata.offset = (currentPage.value - 1) * pageSize.value;
    Querydata.size = pageSize.value;

    userStore.FetchGetUserList(Querydata)
};

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    Querydata.offset = (currentPage.value - 1) * pageSize.value;
    Querydata.size = pageSize.value;
    userStore.FetchGetUserList(Querydata)
};
const handleQuery = () => {
    if (queryParams.value.name === '' && queryParams.value.cellphone === null) {
        ElMessage({
            showClose: true,
            message: '请输入查询条件',
            type: 'warning',
        })
        return
    }
    Querydata.name = queryParams.value.name
    Querydata.cellphone = queryParams.value.cellphone
    userStore.FetchGetUserList(Querydata)
    if (UserList.value.length > 0) {
        ElMessage({
            showClose: true,
            message: '查询成功',
            type: 'success',
        })
    }
}

const handleImport = () => {
    console.log('Import button clicked')
    // 导入功能的实现
}
const handleCreate = () => {
    isCreate.value = true
    centerDialogVisible.value = true
    formData.value = {
        username: '',
        realname: '',
        password: '',
        cellphone: '',
        roleid: '',
        departmentid: '',
        state: null
    }
}

const handleExport = () => {
    console.log('Export button clicked')
    // 导出功能的实现
}

const handlePrint = () => {
    console.log('Print button clicked')
    // 打印功能的实现
}
const entercenterDialogVisible = () => {
    if (isCreate.value) {
        formData.value.state = 0
        formData.value.password = encrypt(formData.value.password)
        userStore.FetchCreateUser(formData.value)
    } else {
        formData.value.password = encrypt(formData.value.password)
        // 删除password属性
        delete (formData.value as Partial<IformData>).password;
        userStore.FetchUpdateUser(EditUserID.value, formData.value)
    }
    centerDialogVisible.value = false

}
</script>

<style scoped lang="less">
.userWrapper {
    padding: 20px;
}

.el-table {
    width: 100%;
}

.footer {
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    .actions {
        margin-top: -18px;

        .tex {
            margin-left: 5px;
        }
    }
}
</style>
