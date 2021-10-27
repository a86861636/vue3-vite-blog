<template>
  <div class="menubar">
    <el-menu
      :default-active="activeItem"
      class="el-menu"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
    >
      <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path" :route="item.path">
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import router from '/@/router/index'
import { useRoute } from 'vue-router'
export default defineComponent({
  setup() {
    const activeItem = useRoute().path
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
    return { menuList, isCollapse, activeItem }
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