<template>
  <div id="home">
    <template v-for="item in articleList" :key="item.id">
      <article-item :post="item"></article-item>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import articleItem from './components/articleItem.vue'
import { getArticleList } from '/@/tcb/api'
export default defineComponent({
  components: {
    articleItem,
  },
  setup() {
    let articleList: Ref<object[]> = ref([])
    onMounted(async () => {
      articleList.value = await getArticleList()
    })
    return { articleList }
  },
})
</script>

<style scoped lang="scss">
#home {
  max-width: 800px;
  padding: 0 20px;
  margin: auto;
}
</style>