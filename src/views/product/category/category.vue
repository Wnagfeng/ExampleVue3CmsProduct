<template>
    <div class="userWrapper">
        <div class="header">
            <el-form :inline="true" :model="queryParams" class="demo-form-inline">
                <el-form-item label="角色名">
                    <el-input v-model="queryParams.name" placeholder="角色名"></el-input>
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
                    <span>导入</span>
                </el-button>
                <el-button type="success" @click="handleCreate" class="action_btn">
                    <el-icon>
                        <EditPen />
                    </el-icon>
                    <span>新建</span>
                </el-button>
                <el-button type="warning" @click="handleExport" class="action_btn">
                    <el-icon>
                        <Bottom />
                    </el-icon>
                    <span>导出</span>
                </el-button>
                <el-button type="info" @click="handlePrint" class="action_btn">
                    <el-icon>
                        <Tickets />
                    </el-icon>
                    <span>打印</span>
                </el-button>
            </div>
        </div>
        <div class="body">
            <el-table :data="DepartmentListData" border fit style="width: 100%">
                <el-table-column prop="id" label="Id" min-width="60" align="center" />
                <el-table-column prop="name" label="部门名称" min-width="150" align="center" />
                <el-table-column prop="leader" label="部门领导" min-width="150" align="center" />
                <el-table-column prop="parentName" label="上级部门" min-width="150" align="center" />
                <el-table-column prop="created_at" label="创建时间" min-width="170" align="center">
                    <template #default="scope">
                        {{ formatUtcString(scope.row.createAt) }}
                    </template>
                </el-table-column>
                <el-table-column prop="updated_at" label="修改时间" min-width="170" align="center">
                    <template #default="scope">
                        {{ formatUtcString(scope.row.updateAt) }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="165px">
                    <template #default="scope">
                        <el-button type="success" plain @click="editRole(scope.row)">编辑</el-button>
                        <el-button type="danger" plain @click="deleteRole(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="footer">
            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30]"
                layout="total, sizes, prev, pager, next, jumper" :total="totalCount" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" />
        </div>
        <el-dialog v-model="centerDialogVisible" :title="dialogTitle" width="30%" center>
            <el-form :model="formData" label-width="80px" size="large">
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入部门名称" />
                </el-form-item>
                <el-form-item label="部门领导" prop="intro">
                    <el-input v-model="formData.leader" placeholder="请输入部门领导" />
                </el-form-item>
                <el-form-item label="上级部门" prop="parentid">
                    <el-select v-model="formData.parentid" placeholder="请选择上级部门" style="width: 100%">
                        <template v-for="item in DepartmentListData">
                            <el-option :label="item.name" :value="item.id" />
                        </template>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="confirmDialog">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { ref, onMounted, computed } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import { Top, Bottom, Tickets, EditPen } from '@element-plus/icons-vue';
import { useDepartmentStore } from '@/stores/department';
import { formatUtcString } from '@/utils/Fomart-Data-Time';

const DepartmentStore = useDepartmentStore();
const { totalCount, DepartmentListData } = storeToRefs(DepartmentStore);

const centerDialogVisible = ref(false);
const isCreate = ref(false);
const formData = ref({ name: '', leader: '', parentid: null });
const currentPage = ref(1);
const pageSize = ref(10);
const queryParams = ref({ name: '' });
const EditDepartmentID = ref<number>(0);

const dialogTitle = computed(() => (isCreate.value ? '新建部门' : '编辑部门'));

DepartmentStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name == 'DeleteDepartment' ||
            name == 'UpdateDepartment'
        ) {
            currentPage.value = 1
        }
    })
});
onMounted(() => {
    DepartmentStore.FetchGetDepartmentList({ offset: 0, size: 10 });
});

const handleQuery = () => {
    if (!queryParams.value.name) {
        ElMessage({ showClose: true, message: '请输入查询条件', type: 'warning' });
        return;
    }
    ElMessage({ showClose: true, message: '查询成功', type: 'success' });
    DepartmentStore.FetchGetDepartmentList({ offset: 0, size: 10, ...queryParams.value });
};

const handleImport = () => {
    console.log('Import button clicked');
};

const handleCreate = () => {
    isCreate.value = true;
    formData.value = { name: '', leader: '', parentid: null };
    centerDialogVisible.value = true;
};

const handleExport = () => {
    console.log('Export button clicked');
};

const handlePrint = () => {
    console.log('Print button clicked');
};

const handleSizeChange = (size: number) => {
    pageSize.value = size;
    fetchRoleList();
};

const handleCurrentChange = (page: number) => {
    currentPage.value = page;
    fetchRoleList();
};

const fetchRoleList = () => {
    DepartmentStore.FetchGetDepartmentList({
        ...queryParams.value,
        offset: (currentPage.value - 1) * pageSize.value,
        size: pageSize.value,
    });
};

const editRole = async (row: any) => {
    isCreate.value = false;
    centerDialogVisible.value = true;
    formData.value = { name: row.name, leader: row.leader, parentid: row.parentid };
    EditDepartmentID.value = row.id
};



const deleteRole = (id: number) => {
    DepartmentStore.DeleteDepartment(id);
};



const confirmDialog = () => {
    if (isCreate.value) {
        DepartmentStore.FetchCreateDepartment(formData.value)
    } else {
        DepartmentStore.UpdateDepartment(EditDepartmentID.value, formData.value)
    }
    centerDialogVisible.value = false;
};
</script>

<style scoped lang="less">
.userWrapper {
    padding: 20px;
}

.footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions {
    display: flex;
    gap: 10px;
}

.action_btn {
    display: flex;
    align-items: center;
}

.action_btn span {
    margin-left: 5px;
}
</style>