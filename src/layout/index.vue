<template>
  <layout-header></layout-header>
  <layout-body></layout-body>
</template>

<script lang="ts">
import layoutHeader from '/@/layout/components/layout-header.vue'
import layoutBody from '/@/layout/components/layout-body.vue'
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
  name: 'layout',
  components: {
    layoutHeader,
    layoutBody,
  },
  setup() {
    onMounted(async () => {})
  },
})
</script>

<style lang="scss" scoped>
i {
  font-size: 18px;
  position: relative;
  top: 3px;
}
</style>