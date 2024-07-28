<template>
  <div class="sideWrapper">
    <div class="SideTitle">
      <div class="logo">
        <img src="@/assets/logo.png" alt="">
      </div>
      <div class="text" v-show="!isFold">蘑菇街商城管理系统</div>
    </div>
    <el-menu :collapse="isFold" :default-active="'1-1'" :default-openeds="['1']" text-color="#b7bdc3"
      active-text-color="#fff" background-color="#001529">
      <template v-for="(item, index) in MenuList" :key="item.id">
        <el-sub-menu class="el-sub-menu" :index="item.id + ''">
          <template #title>
            <span class="elitemtitle">{{ item.title }}</span>
          </template>
          <template v-for="(iten, indey) in item.menu" :key="iten.id">
            <el-menu-item :index="item.id + '-' + iten.id + ''" @click="topathClick(iten)">{{ iten.name
              }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
// import menu from "@/router/Main/system/menu/menu";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
const router = useRouter()
const props = defineProps({
  isFold: {
    type: Boolean,
    default: true
  }
})
const MenuList = [
  {
    title: "系统总览",
    id: 1,
    menu: [
      {
        id: 1,
        name: "商品统计",
        path: "/main/analysis/dashboard",
      }
    ]
  },
  {
    title: "系统管理",
    id: 2,
    menu: [
      {
        id: 1,
        name: "用户管理",
        path: "/main/system/user",
      },
      {
        id: 2,
        name: "角色管理",
        path: "/main/system/role",
      },
      {
        id: 3,
        name: "菜单管理",
        path: "/main/system/menu",
      },
      {
        id: 4,
        name: "部门管理",
        path: "/main/system/department",
      }
    ]
  },
  {
    title: "商品管理",
    id: 3,
    menu: [
      {
        id: 1,
        name: "商品类别",
        path: "/main/product/category",
      },
      {
        id: 2,
        name: "商品信息",
        path: "/main/product/goods",
      }
    ]
  },
]
const topathClick = (iten: any) => {
  router.push(iten.path)
}
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
