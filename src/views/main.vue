<template>
    <el-container>
        <Side :isFold="isFold" />
        <el-container>
            <el-main>
                <el-scrollbar>
                    <Header @changeFold="handelFold" />
                    <Main />
                </el-scrollbar>
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts" setup>
import Side from "@/components/Side.vue";
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
import { ref, onMounted } from "vue";
import { loadLocalRouters } from '@/utils/map-menus'
import { testLogin } from '@/service/login/login'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router'
const isFold = ref(false);
const router = useRouter()
const handelFold = (flageFlod: boolean) => {
    isFold.value = flageFlod;
    console.log("fold", flageFlod);
}
onMounted(async () => {
    // 判断当前token是否过期
    const res = await testLogin()
    if (res.code == 401) {
        ElMessage({
            showClose: true,
            message: "登录已过期",
            type: 'error',
        })
        router.push("/login")
    }
    // console.log(loadLocalRouters())
    // console.log("mounted");
});
</script>

<style scoped lang="less">
.el-container {
    height: 100%;
}

.el-container {}
</style>