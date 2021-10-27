<template>
  <div id="articleList">
    <div v-if="articleList.length == 0" class="loading">
      <template v-for="item in pageSize / 2" :key="item">
        <div class="item">
          <div class="title">-</div>
          <div class="tag-container">
            <div class="tag-icon">-</div>
            <div class="tag-item">-</div>
            <div class="tag-item">-</div>
          </div>
        </div>
      </template>
    </div>
    <template v-for="item in articleList" :index="item._id">
      <router-link :to="{ path: '/articleDetail', query: { id: item._id } }">
        <div class="item">
          <div class="title">{{ item.title }}</div>
          <div class="tag-container">
            <img class="tag-img" :src="tagImg" />
            <span>{{ item.tag || '无标签' }}</span>
          </div>
        </div>
      </router-link>
    </template>
    <div class="pagination-container">
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="articleCount"
        @current-change="pageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import tagImg from '/@/assets/img/tag.png'

import { onMounted, ref, Ref } from 'vue'
import { getActiveArticleList, getActiveArticleCount } from '/@/tcb/api'
import type { IArticleRes } from '/@/interface/api'
let articleList: Ref<IArticleRes[]> = ref([])
let articleCount: Ref<number> = ref(0)
let pageSize = 10
async function pageChange(page: number) {
  articleList.value = await getActiveArticleList(page, pageSize)
}
onMounted(async () => {
  articleCount.value = await getActiveArticleCount()
  articleList.value = await getActiveArticleList(1, pageSize)
})
</script>

<style lang="scss" scoped>
.item {
  padding: 20px;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: $box-shadow;

  .title {
    font-size: 22px;
    font-weight: 500;
    color: $text-tt-color;
  }

  .tag {
    color: $text-sub-color;
  }
}
.item:hover {
  box-shadow: $box-shadow-hover;
}
.tag-container {
  margin-top: 10px;
}
.tag-img {
  width: 15px;
  height: 15px;
  margin: 0 5px 0 0;
}
.pagination-container {
  display: flex;
  justify-content: center;
}

$loading-color: #e6e6e6;
.loading {
  .title {
    background: $loading-color;
    color: $loading-color;
  }
  .tag-container {
    display: flex;
    flex-direction: row;
    .tag-icon {
      width: 20px;
      background: $loading-color;
      color: $loading-color;
    }
    .tag-item {
      margin-left: 10px;
      width: 40px;
      background: $loading-color;
      color: $loading-color;
    }
  }
}
</style>
