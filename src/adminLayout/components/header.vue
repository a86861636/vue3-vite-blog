<template>
  <div class="header">
    <div class="title">title</div>
    <el-dropdown>
      <div class="userInfo">
        <el-avatar
          :size="30"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <div class="name">11</div>
        <i class="el-icon-arrow-down" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-link
              href="https://github.com/hsiangleev/element-plus-admin"
              target="_blank"
              :underline="false"
              >项目地址</el-link
            >
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title {
  flex: 1;
  text-align: center;
}
.userInfo {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 20px;
  .name {
    padding: 0 5px;
  }
}
</style>