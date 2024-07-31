<template>
    <div class="BaseBody">
        <el-table :data="UserList" border fit style="width: 100%">
            <el-table-column prop="userid" label="Id" min-width="60" align="center" />
            <el-table-column prop="username" label="用户名" min-width="150" align="center" />
            <el-table-column prop="cellphone" label="手机号码" min-width="150" align="center" />
            <el-table-column prop="role_name" label="角色" min-width="100" align="center" />
            <el-table-column prop="department_name" label="部门" min-width="130" align="center" />
            <el-table-column prop="state" label="状态" min-width="105" align="center">
                <template #default="scope">
                    <el-button :type="scope.row.state === 1 ? 'success' : 'danger'" plain>
                        {{ scope.row.state === 1 ? '启用' : '禁用' }}
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column prop="realname" label="真实姓名" min-width="110" align="center" />
            <el-table-column prop="created_at" label="创建时间" min-width="170" align="center">
                <template #default="scope">
                    {{ formatUtcString(scope.row.created_at) }}
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="修改时间" min-width="170" align="center">
                <template #default="scope">
                    {{ formatUtcString(scope.row.updated_at) }}
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="165px">
                <template #default="scope">
                    <el-button type="success" plain @click="EditUserData(scope.row)">编辑</el-button>
                    <el-button type="danger" plain @click="deleteClick(scope.row.userid)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
            layout="total, sizes, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </div>
</template>


<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { formatUtcString } from '@/utils/Fomart-Data-Time'

const emit = defineEmits(['edit', 'delete'])
const userStore = useUserStore()
const { UserList, totalCount } = storeToRefs(userStore)

const currentPage = ref(1)
const pageSize = ref(10)
const Querydata = {
    offset: (currentPage.value - 1) * pageSize.value,
    size: pageSize.value,
    name: '',
    cellphone: null
}

const fetchUserList = () => {
    userStore.FetchGetUserList(Querydata)
}

onMounted(() => {
    fetchUserList()
})

const EditUserData = (row: any) => emit('edit', row)
const deleteClick = (id: number) => emit('delete', id)

const handleCurrentChange = (page: number) => {
    currentPage.value = page
    Querydata.offset = (currentPage.value - 1) * pageSize.value
    fetchUserList()
}

const handleSizeChange = (size: number) => {
    pageSize.value = size
    Querydata.size = size
    Querydata.offset = (currentPage.value - 1) * pageSize.value
    fetchUserList()
}
</script>

<style scoped>
.BaseBody {
    padding: 20px;
}
</style>
