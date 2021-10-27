<template>
  <div class="table">
    <div class="fnc-container">
      <router-link to="/editArticle">
        <el-button class="add-btn" type="primary" @click="searchList">新增文章</el-button>
      </router-link>
      <el-input class="search-input" v-model="searchText" placeholder="搜索">
        <template #prefix>
          <i class="el-input__icon el-icon-search"></i>
        </template>
      </el-input>
      <el-select class="search-key" v-model="searchKey" placeholder="Select">
        <el-option
          v-for="item in searchOpt"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-button class="search-btn" type="primary" @click="searchList">搜索</el-button>
    </div>
    <el-table :data="articleList" style="width: 100%">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="is_active" label="发布"></el-table-column>
      <el-table-column prop="pubTime" label="修改时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <router-link :to="'/editArticle/?article_id=' + scope.row._id">
            <el-button type="text" size="small">编辑</el-button>
          </router-link>
          <el-button
            class="remove-btn"
            @click="removeItem(scope.row._id)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import { getArticleList, removeArticle, searchArticle } from '/@/tcb/api'
import { ElNotification, ElMessageBox } from 'element-plus'
let articleList: Ref<object[]> = ref([])

const removeItem = (id: string) => {
  ElMessageBox.confirm('确定删除?')
    .then(async () => {
      if (await removeArticle(id)) {
        ElNotification({
          title: '系统提示',
          message: '操作成功',
          type: 'success',
        })
        articleList.value = await getArticleList()
      }
    })
    .catch(() => {
      // catch error
    })
}

//搜索
let searchOpt = [
  {
    label: '标题',
    value: 'title'
  },
  {
    label: 'id',
    value: '_id'
  },
  {
    label: '发布',
    value: 'is_active'
  }
]
let searchKey = ref(searchOpt[0].value)
let searchText = ref('')
async function searchList() {
  if (searchText.value) {
    let res = await searchArticle({ key: searchKey.value, value: searchText.value })
    articleList.value = res
  }
}
onMounted(async () => {
  articleList.value = await getArticleList()
})
</script>

<style scoped>
.fnc-container {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
}
.search-input {
  width: 200px;
  margin-left: 40px;
}
.search-key {
  width: 120px;
  margin-left: 10px;
}
.search-btn {
  margin-left: 10px;
}
.remove-btn {
  margin-left: 10px;
}
</style>
