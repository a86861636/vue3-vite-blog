<template>
  <div class="menubar">
    <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group> -->
    <!-- <div class="systemName">
    {{systemName}}
  </div> -->
    <el-menu
      default-active="2"
      class="el-menu"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="index"
        index="index"
        :route="item.path"
      >
        <i class="el-icon-menu"></i>
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, getCurrentInstance, ref, Ref } from 'vue'
import router from '/@/router/index'
export default defineComponent({
  setup() {
    const menuList: Ref<any> = ref([])
    const isCollapse = ref(false)
    onMounted(() => {
      console.log(router.getRoutes())
      for (let item of router.getRoutes()) {
        if (item.name === 'admin') {
          menuList.value = item.children
          break
        }
      }
      console.log('menuList.value')
      console.log(menuList.value)
    })
    return { menuList, isCollapse }
  },
})
</script>
<style lang="scss" scoped>
.menubar {
  height: 100%;
  display: flex;
}
.systemName {
  height: 48px;
  text-align: center;
  color: white;
}
.el-menu {
  flex: 1;
}
</style>