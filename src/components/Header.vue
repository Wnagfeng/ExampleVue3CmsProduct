<template>
  <div class="Main-header-Wrapper">
    <div class="left">
      <div class="buton" @click="HandelBtnclick">
        <el-icon :size="30" v-if="isFold">
          <Expand />
        </el-icon>
        <el-icon :size="30" v-else>
          <Fold />
        </el-icon>
      </div>
    </div>
    <div class="userinfo">
      <span class="icon">
        <el-icon size="20px">
          <Message />
        </el-icon>
      </span>
      <span class="icon">
        <el-icon size="20px">
          <ChatDotRound />
        </el-icon>
        <span class="dtos"></span>
      </span>
      <span class="icon">
        <el-icon size="20px">
          <Search />
        </el-icon>
      </span>
      <span class="img">
        <el-dropdown tabindex="" :teleported="false">
          <div class="info">
            <el-col :span="12">
              <el-avatar :size="30"
                src="https://img0.baidu.com/it/u=3501617850,3346833213&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300" />
            </el-col>
            <span class="name">汪枫</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="extLogin">
                <el-icon>
                  <CircleClose />
                </el-icon>
                退出系统
              </el-dropdown-item>
              <el-dropdown-item :divided="true">
                <el-icon>
                  <InfoFilled />
                </el-icon>
                个人信息
              </el-dropdown-item>
              <el-dropdown-item>
                <el-icon>
                  <Lock />
                </el-icon>
                修改密码
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Expand, Fold, Message, ChatDotRound, Search, Lock, InfoFilled, CircleClose } from '@element-plus/icons-vue'
import { LOGIN_TOKEN, USER_INFO } from '@/global/constants'
import { useRouter } from 'vue-router'
const router = useRouter()
const isFold = ref(false)
const emits = defineEmits(['changeFold'])
const HandelBtnclick = () => {
  isFold.value = !isFold.value
  emits('changeFold', isFold.value)
}
const extLogin = () => {
  ElMessage({
    showClose: true,
    message: '退出成功',
    type: 'success',
  })
  localStorage.removeItem(LOGIN_TOKEN)
  router.push("/login")
}
</script>


<style scoped lang="less">
.Main-header-Wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 5px;

  .left {
    display: flex;
    align-items: center;
    flex: 1;

    .Breadcrumb {
      margin-left: 20px;
    }

    .buton {
      cursor: pointer;
    }
  }



  .userinfo {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 20px;
      transition: transform 0.3s ease-out;

      &:hover {
        color: skyblue;
        // animation: movetop;
      }

      &:hover {
        transform: translateY(-8px);
      }

      .dtos {
        position: absolute;
        display: inline-block;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: red;
      }
    }

    .img {
      margin-left: 20px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      font-weight: 700;

      .info {
        margin-left: 10px;
        align-items: center;
        display: flex;
        width: 80px;
        border: none !important;
      }

      :deep(.el-dropdown-menu__item) {
        font-weight: 700;
        color: rgb(0, 0, 0);
      }
    }
  }
}
</style>
