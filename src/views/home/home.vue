<template>
  <div id="home">
    <template v-for="item in articleList" :key="item.id">
      <article-item :post="item"></article-item>
    </template>
    <div>
      <input id="file" type="file" @change="getFile" />
      <button @click="upload">上传</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import articleItem from './components/articleItem.vue'
import { getArticleList, uploadFile } from '/@/tcb/api'
export default defineComponent({
  components: {
    articleItem,
  },
  setup() {
    let articleList: Ref<object[]> = ref([])
    onMounted(async () => {
      articleList.value = await getArticleList()
    })

    let file: any = ''
    function getFile(e: Event) {
      const input = e.target as HTMLInputElement
      let files = input.files
      if (files) {
        file = files[0]
      }
    }
    async function upload() {
      console.log(file)
      console.log(await uploadFile(file))
    }
    return { articleList, upload, getFile }
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