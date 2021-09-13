<template>
  <div class="h-screen">
    <LayoutMenubar class="side"></LayoutMenubar>
    <div class="right">
      <LayoutHeader class="header"></LayoutHeader>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import LayoutMenubar from './components/menubar.vue'
import LayoutHeader from './components/header.vue'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'layout',
  components: {
    LayoutMenubar,
    LayoutHeader,
  },
  setup() {
    onMounted(async () => {})
  },
})
</script>

<style lang="scss" scoped>
$header-height: 48px;
$side-width: 200px;
.h-screen {
  height: 100vh;
}
.side {
  position: fixed;
  width: $side-width;
  height: 100%;
  left: 0;
  height: 100%;
  top: 0;
}
.right {
  position: relative;
  margin: 0 0 0 $side-width;
  height: 100%;
}
.header {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  height: $header-height;
  z-index: 10;
  background: white;
  border-bottom: solid 1px #e6e6e6;
}
.content {
  padding: $header-height 0 0 0;
}
</style>