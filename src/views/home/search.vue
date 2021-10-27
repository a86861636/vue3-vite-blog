<template>
  <div id="search">
    <article-list></article-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import articleList from './components/articleList.vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    articleList,
  },
  setup() {
    const articleList = ref([])
    onMounted(() => {
      let words = useRoute().query.words
      console.log(words)
      fetch('/api/getArticle')
        .then((response) => {
          return response.json()
        })
        .then((res) => {
          let data = res.data.data
          articleList.value = data
        })
    })
    return { articleList }
  },
})
</script>

<style scoped lang="scss">
#search {
  max-width: 800px;
  padding: 0 20px;
  margin: auto;
}
</style>