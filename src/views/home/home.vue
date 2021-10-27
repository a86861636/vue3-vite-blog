<template>
  <div>
    <div id="home">
      <div class="left">
        <article-list></article-list>
      </div>
      <div class="right">
        <page-info></page-info>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import articleList from './components/articleList.vue'
import pageInfo from './components/pageInfo.vue'
import { usePageStore } from '/@/store/modules/page'
const pageStore = usePageStore()
onMounted(() => {
  pageStore.ready = true
})
</script>
<style scoped lang="scss">
#home {
  width: 1100px;
  padding: 40px 0 0 0;
  margin: auto;
  display: flex;
  flex-direction: row;
}

.left {
  flex: 1;
}
.right {
  margin-left: 50px;
  width: 300px;
}
</style>