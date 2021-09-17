<template>
  <div class="table">
    <el-table :data="articleList" border style="width: 100%">
      <el-table-column prop="_id" label="id" width="180" border>
      </el-table-column>
      <el-table-column prop="banner" label="封面"> </el-table-column>
      <el-table-column prop="summary" label="概要"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <router-link :to="'/editArticle/?article_id=' + scope.row._id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { getArticleList } from '/@/tcb/api'
export default defineComponent({
  setup() {
    let articleList: Ref<object[]> = ref([])
    onMounted(async () => {
      articleList.value = await getArticleList()
    })
    return { articleList }
  },
})
</script>

<style scoped>
</style>
