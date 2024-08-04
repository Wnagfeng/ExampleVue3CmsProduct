<template>
  <div class="sideWrapper">
    <div class="SideTitle">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="text" v-show="!isFold">蘑菇街商城管理系统</div>
    </div>
    <el-menu :collapse="isFold" :default-active="id + ''" :default-openeds="['1']" text-color="#b7bdc3"
      active-text-color="#fff" background-color="#001529">
      <template v-for="(item, index) in roleMenuList" :key="item.id">
        <el-sub-menu class="el-sub-menu" :index="item.id + ''">
          <!-- <el-icon> -->
          <!-- <HomeFilled />  只需要动态替换这个就行 -->
          <!-- <component :is="item.icon.split('-icon-')[1]"></component> -->
          <!-- </el-icon> -->
          <template #title>
            <span class="elitemtitle">{{ item.name }}</span>
          </template>
          <template v-for="(iten, indey) in item.children" :key="iten.id">
            <el-menu-item :index="iten.id + ''" @click="topathClick(iten)">
              {{ iten.name }}
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useLoginStore } from '@/stores/login'
import { mapPathtoUsermenus } from '@/utils/map-menus'
const routers = useRoute()
const loginStore = useLoginStore()
const { roleMenuList } = storeToRefs(loginStore)
const props = defineProps({
  isFold: {
    type: Boolean,
    default: true
  }
})

const topathClick = (iten: any) => {
  router.push(iten.url)
}
const id = computed(() => {
  return mapPathtoUsermenus(routers.path, [...roleMenuList.value])
})
</script>

<style scoped lang="less">
.sideWrapper {
  background-color: #001529;
  transition: width 0.3s ease;

  :deep(.el-menu) {
    color: #fff;
  }

  :deep(.el-sub-menu) {
    background-color: #324157;

  }

  .el-menu {
    border: none;
  }

  .SideTitle {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;

    height: 100px;

    .logo {
      margin-left: 5px;
      margin-top: 5px;

      img {
        width: 50px;
        height: 50px;
      }
    }

    .text {
      margin-top: 10px;
      margin-left: 20px;
      margin-right: 10px;
    }
  }


  .el-sub-menu {
    background-color: #001529;

    .elitemtitle {
      margin-left: 30px;
      font-size: 16px;
    }

    .el-menu-item {
      color: #98a2ac;
      padding-left: 50px !important;
      background-color: #0c2135;
    }

    .el-menu-item :hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      color: #fff;
      background-color: #0a60bd;
    }
  }
}
</style>
