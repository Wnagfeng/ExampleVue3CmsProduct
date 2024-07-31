<template>
    <div class="Baseheader">
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
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { Top, Bottom, Tickets, EditPen } from '@element-plus/icons-vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const currentPage = ref(1);
const pageSize = ref(10);
const queryParams = ref({ name: '', cellphone: null });
const { UserList } = storeToRefs(userStore);

const fetchUserList = () => {
    const queryData = {
        offset: (currentPage.value - 1) * pageSize.value,
        size: pageSize.value,
        name: queryParams.value.name,
        cellphone: queryParams.value.cellphone
    };
    userStore.FetchGetUserList(queryData); // 获取用户列表
};

const handleQuery = () => {
    if (!queryParams.value.name && !queryParams.value.cellphone) {
        ElMessage({
            showClose: true,
            message: '请输入查询条件',
            type: 'warning',
        });
        return;
    }
    fetchUserList();
    if (UserList.value.length > 0) {
        ElMessage({
            showClose: true,
            message: '查询成功',
            type: 'success',
        });
    }
};

const handleCreate = () => {
    console.log('新建用户');
};

const handleImport = () => {
    console.log('导入功能的实现');
};

const handleExport = () => {
    console.log('导出功能的实现');
};

const handlePrint = () => {
    console.log('打印功能的实现');
};


onMounted(() => {
    fetchUserList();
});
</script>

<style scoped lang="less">
.Baseheader {
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

.userWrapper {
    padding: 20px;
}

.footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}
</style>
