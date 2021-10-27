<template>
  <div class="h-screen">
    <Layout-menubar class="side"></Layout-menubar>
    <div class="right">
      <Layout-header class="header"></Layout-header>
      <transition name="fade-transform" mode="out-in">
        <router-view class="content"></router-view>
      </transition>
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
    onMounted(async () => { })
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
  z-index: 2;
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
  position: relative;
  z-index: 1;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>