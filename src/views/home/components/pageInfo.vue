<template>
  <div id="pageInfo">
    <img class="avatar" :src="avatarImg" />
    <div class="record">
      <div class="item">
        <div class="number">{{ articleCount }}</div>
        <div class="text">文章</div>
      </div>
      <div class="line"></div>
      <div class="item">
        <div class="number">{{ tagsList.length }}</div>
        <div class="text">标签</div>
      </div>
    </div>
    <!-- <div class="category">
      <div class="title">
        <img class="icon" :src="categoryImg" />
        <div class="text">目录</div>
      </div>
    </div>-->
    <div class="tag">
      <div class="title">
        <img class="icon" :src="tagImg" />
        <div class="text">标签</div>
      </div>
      <div class="list">
        <div
          class="item"
          v-for="(item,index) in tagsList"
          :key="item._id"
          :style="'background:' + colorList[index % colorLength]"
        >{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarImg from '/@/assets/img/avatar.jpg'
import tagImg from '/@/assets/img/tag.png'

const colorList = [
  'hsl(42, 48%, 54%)',
  'hsl(138, 24%, 48%)',
  'rgb(200, 138, 131)',
  'rgb(84, 221, 226)',
  'rgb(178, 199, 168)',
  'rgb(16, 195, 195)',
  'hsl(0, 21%, 68%)',
  'rgb(226, 166, 198)',
  'hsl(278, 17%, 66%)',
  'rgb(153, 199, 235)',
]
const colorLength = colorList.length

import { onMounted, ref, Ref } from 'vue'
import { getTagsList, getArticleCount } from '/@/tcb/api'
import type { ITagsRes } from '/@/interface/api'
let tagsList: Ref<ITagsRes[]> = ref([])
let articleCount: Ref<number> = ref(0)
onMounted(async () => {
  articleCount.value = await getArticleCount()
  tagsList.value = await getTagsList()
  console.log(tagsList.value)
})
</script>

<style scoped lang="scss">
#pageInfo {
  box-shadow: $box-shadow;
  padding: 30px;
}
.avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  display: block;
  margin: auto;
}
.record {
  display: flex;
  flex-direction: row;
  text-align: center;
  margin-top: 20px;
  padding-bottom: 25px;
  border-bottom: 1px solid #cacaca;
  .line {
    border-left: 1px solid $text-tt-color;
  }
  .item {
    width: 50%;
    .number {
      font-size: 16px;
    }
    .text {
      color: $text-sub-color;
    }
  }
}
.tagImg {
  width: 20px;
}
.tag {
  .list {
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    .item {
      color: white;
      padding: 2px 5px;
      border-radius: 2px;
      margin-top: 5px;
      margin-right: 10px;
      cursor: pointer;
    }
    .item:hover {
      transform: scale(1.05);
    }
  }
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 20px;
    .icon {
      width: 17px;
      height: 17px;
    }
    .text {
      padding-left: 5px;
    }
  }
}
</style>
