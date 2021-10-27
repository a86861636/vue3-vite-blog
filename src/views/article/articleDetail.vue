<template>
  <div id="articleDetail">
    <div class="title">{{ articleDetail.title }}</div>
    <div class="flex-row">
      <v-md-editor class="content" v-model="articleDetail.content" mode="preview" ref="preview"></v-md-editor>
      <div class="right">
        <div class="auchor-container">
          <div class="auchor-title">目录</div>
          <div
            v-for="(item,index) in titles"
            :style="{ padding: `5px 0 5px ${item.indent + 1 * 10}px` }"
            @click="handleAnchorClick(item)"
            :class="{ 'auchor-item': true, 'active': index === curIndex }"
          >
            <a style="cursor: pointer">{{ item.title }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, ref, Ref, onUnmounted } from 'vue'
import { getArticleDetail } from '/@/tcb/api'
import type { IArticleDetailRes } from '/@/interface/api'
const query = useRouter().currentRoute.value.query
const articleId: string = String(query.id)
let articleDetail: Ref<IArticleDetailRes> = ref({
  title: '',
  content: '',
  is_active: false,
  pubTime: '',
  _id: '',
  _openid: ''
})

//目录功能
interface IAnchor {
  indent: number
  lineIndex: number
  title: string
  top: number
}
let titles: Ref<IAnchor[]> = ref([])
let preview: Ref<any> = ref(null)
function getTitles() {//目录获取
  setTimeout(() => {
    const anchors = preview.value.$el.querySelectorAll('h2,h3')
    const data = Array.from(anchors).filter((title: any) => !!title.innerText.trim())
    if (!data.length) {
      titles.value = []
      return
    }
    const hTags = Array.from(new Set(data.map((title: any) => title.tagName))).sort();
    titles.value = data.map((el: any) => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName),
      top: el.getBoundingClientRect().top
    }))
  })
  return
}

let curIndex: Ref<number> = ref(0)
function scrollFnc() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let i: number = -1
  for (let item of titles.value) {
    if (item.top - 200 < scrollTop) {
      i++
    }
  }
  curIndex.value = i < 0 ? 0 : i
}

function handleAnchorClick(anchor: IAnchor) {
  const { lineIndex } = anchor;
  const heading = preview.value.$el.querySelector(`[data-v-md-line="${lineIndex}"]`);
  if (heading) {
    preview.value.previewScrollToTarget({
      target: heading,
      scrollContainer: window,
      top: 100,
    });
  }
}
const throttle = function (this: any, func: any, delay: any) {
  const that = this
  let startTime = Date.now()

  return function (...args: any) {
    let lastTime = Date.now()

    if (lastTime - startTime > delay) {
      func.apply(that, args)
      startTime = Date.now()
    }
  }
}
onMounted(async () => {
  articleDetail.value = await getArticleDetail(articleId)
  getTitles()

  window.addEventListener('scroll', throttle(scrollFnc, 10), true)
})
onUnmounted(() => {
  window.removeEventListener("scroll", throttle(scrollFnc, 10), true)
})
</script>

<style scoped>
#articleDetail {
  margin: 0 auto;
  padding: 80px 0;
  width: 1200px;
  position: relative;
}
.title {
  font-size: 44px;
  font-weight: 600;
}
.flex-row {
  display: flex;
  flex-direction: row;
  font-size: 17px;
  margin-top: 40px;
}
.right {
  width: 200px;
  position: relative;
}
.auchor-container {
  /* position: relative; */
  position: fixed;
}
.auchor-title {
  font-weight: 600;
  margin-bottom: 10px;
}
.auchor-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.active {
  background: #e4e4e4;
}
</style>
