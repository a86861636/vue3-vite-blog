<template>
  <div id="layout-body">
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <back-top></back-top>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style>
.fade-enter-active {
  transition: all 1s ease;
}
.fade-leave-active {
  transition: all 0s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
#layout-body {
  /* header = 80px */
  margin-top: 80px;
  min-height: -moz-calc(100vh - 80px);
  min-height: -webkit-calc(100vh - 80px);
  min-height: calc(100vh - 80px);
}
</style>