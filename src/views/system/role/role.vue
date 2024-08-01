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
            <el-table :data="RoleList" border fit style="width: 100%">
                <el-table-column prop="id" label="Id" min-width="60" align="center" />
                <el-table-column prop="name" label="角色名" min-width="150" align="center" />
                <el-table-column prop="intro" label="介绍" min-width="150" align="center" />
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
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="权限介绍" prop="intro">
                    <el-input v-model="formData.intro" placeholder="请输入权限介绍" />
                </el-form-item>
                <el-form-item label="权限分配" prop="menuList">
                    <el-tree ref="treeRef" :data="MenuListData" show-checkbox node-key="id" highlight-current
                        :props="{ children: 'children', label: 'name' }" @check="handleCheckClick" />
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
import { ref, onMounted, nextTick, computed } from 'vue';
import { ElMessage } from 'element-plus';
import 'element-plus/es/components/message/style/css';
import { Top, Bottom, Tickets, EditPen } from '@element-plus/icons-vue';
import { useRoleStore } from '@/stores/role';
import { formatUtcString } from '@/utils/Fomart-Data-Time';

const RoleStore = useRoleStore();
const { totalCount, RoleList, MenuListData } = storeToRefs(RoleStore);

const centerDialogVisible = ref(false);
const isCreate = ref(false);
const formData = ref({ name: '', intro: '' });
const currentPage = ref(1);
const pageSize = ref(10);
const queryParams = ref({ name: '' });
const CheckMenuListIds = ref<number[]>([]);
const treeRef = ref<any>(null);

const dialogTitle = computed(() => (isCreate.value ? '新建角色' : '编辑角色'));

RoleStore.$onAction(({ name, after }) => {
    after(() => {
        if (
            name == 'DeleteRole' ||
            name == 'FetchPatchAndCreateRole'
        ) {
            currentPage.value = 1
        }
    })
});
onMounted(() => {
    RoleStore.FetchGetRoleList({ offset: 0, size: 10 });
    RoleStore.FetchGetMenuList();
});

const handleQuery = () => {
    if (!queryParams.value.name) {
        ElMessage({ showClose: true, message: '请输入查询条件', type: 'warning' });
        return;
    }

    RoleStore.FetchGetRoleList({ ...queryParams.value, offset: 0, size: pageSize.value });
    ElMessage({ showClose: true, message: '查询成功', type: 'success' });
};

const handleImport = () => {
    console.log('Import button clicked');
};

const handleCreate = () => {
    isCreate.value = true;
    formData.value = { name: '', intro: '' };
    centerDialogVisible.value = true;
    nextTick(() => treeRef.value?.setCheckedKeys([]));
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
    RoleStore.FetchGetRoleList({
        ...queryParams.value,
        offset: (currentPage.value - 1) * pageSize.value,
        size: pageSize.value,
    });
};

const editRole = async (row: any) => {
    isCreate.value = false;
    centerDialogVisible.value = true;
    treeRef.value?.setCheckedKeys([]);
    formData.value = { name: row.name, intro: row.intro };

    const RoleMenuList = await RoleStore.FetchGetRoleForId(row.id);
    const selectedIds = mapMenuListToIds(RoleMenuList);
    nextTick(() => treeRef.value?.setCheckedKeys(selectedIds));
};

const mapMenuListToIds = (menuList: any[]) => {
    const ids: number[] = [];
    const mapIds = (menus: any[]) => {
        menus.forEach((item) => {
            if (item.children) {
                mapIds(item.children);
            } else {
                ids.push(item.id);
            }
        });
    };
    mapIds(menuList);
    return ids;
};

const deleteRole = (id: number) => {
    RoleStore.DeleteRole(id);
};

const handleCheckClick = (data1: any, data2: any) => {
    CheckMenuListIds.value = [...data2.checkedKeys, ...data2.halfCheckedKeys];
};

const confirmDialog = () => {
    const RoleData = { ...formData.value, menuList: CheckMenuListIds.value };
    if (isCreate.value) {
        RoleStore.FetchPatchAndCreateRole(RoleData);
    } else {
        RoleStore.FetchPatchAndCreateRole(RoleData);
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