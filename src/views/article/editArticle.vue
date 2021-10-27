<template>
  <div id="editArticle">
    <div class="top-container">
      <el-input class="title-input" v-model="itemDetail.title" maxlength="50" placeholder="请输入文章标题"></el-input>
      <el-switch
        class="active-switch"
        active-text="显示"
        inactive-text="隐藏"
        v-model="itemDetail.is_active"
      />
      <el-select
        v-model="tagValue"
        class="tag-select"
        filterable
        default-first-option
        placeholder="请输入或选择标签"
      >
        <el-option v-for="item in tagsList" :key="item._id" :label="item.name" :value="item.name"></el-option>
      </el-select>
      <el-button class="save-btn" @click="handleSubmit" type="primary">保存</el-button>
      <el-button class="back-btn" @click="goback">返回</el-button>
    </div>
    <v-md-editor
      class="editor-container"
      :include-level="[2, 3, 4]"
      v-model="itemDetail.content"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
    ></v-md-editor>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref, Ref } from 'vue'
import {
  useUploadFile,
  getArticleDetail,
  setArticle,
  addArticle,
  getTagsList
} from '/@/tcb/api'
import { dateTimeToString } from '/@/utils/tools'
import type {
  setArticleParam,
} from '/@/tcb/api'
import type { ITagsRes } from '/@/interface/api'
import { ElNotification } from 'element-plus'
import router from '/@/router/index'
// import { getArticleDetail } from '/@/tcb/api'
async function handleUploadImage(
  event: Event,
  insertImage: Function,
  files: File[]
) {
  // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
  console.log(event)
  console.log(files[0])
  let res = await useUploadFile(files[0])

  // 此处只做示例
  insertImage({
    url: res.download_url,
    desc: files[0].name,
    width: '250px',
    height: '250px',
  })
}

//获取文章详情
const itemDetail: any = ref({
  title: '',
  content: '',
  is_active: false,
})
let articleData: any
const getDetail = async () => {
  let article_id = useRoute().query.article_id || ''
  if (!article_id) return
  articleData = await getArticleDetail(String(article_id))
  if (articleData) {
    itemDetail.value.title = articleData.title
    itemDetail.value.content = articleData.content
    itemDetail.value.is_active = articleData.is_active
    tagValue.value = articleData.tag
  }
  // articleFrom.value=data
}

const saveItem = async () => {
  let form: setArticleParam = {
    id: articleData._id,
    content: itemDetail.value.content,
    is_active: itemDetail.value.is_active,
    pubTime: dateTimeToString(new Date()),
    title: itemDetail.value.title,
    tag: tagValue.value
  }
  if (await setArticle(form)) {
    ElNotification({
      title: '系统提示',
      message: '操作成功',
      type: 'success',
    })
  }
}

function handleSubmit() {
  if (!articleData) {
    addItem()
  } else {
    saveItem()
  }
}
const addItem = async () => {
  let form: any = {
    content: itemDetail.value.content,
    is_active: itemDetail.value.is_active,
    pubTime: dateTimeToString(new Date()),
    title: itemDetail.value.title,
    tag: tagValue.value
  }
  if (await addArticle(form)) {
    ElNotification({
      title: '系统提示',
      message: '操作成功',
      type: 'success',
    })
    goback()
  }
}

//保存文章
function saveEdit(e: any) {
  let win: any = window
  var key = win.event.keyCode ? win.event.keyCode : win.event.which
  if (key === 83 && e.ctrlKey) {
    handleSubmit()
    e.preventDefault()
  }
}

//标签
let tagsList: Ref<ITagsRes[]> = ref([])
let tagValue = ref('')

//返回
function goback() {
  router.push({
    path: '/adminArticle'
  })
}

onMounted(async () => {
  //获取文章信息
  getDetail()
  //获取标签列表
  tagsList.value = await getTagsList()
  document.addEventListener('keydown', saveEdit)
})

onUnmounted(() => {
  document.removeEventListener('keydown', saveEdit)
})

</script>
<style lang='scss'>
#editArticle {
  .title-input {
    .el-input__inner {
      height: 100px;
      border: 0;
    }
  }
}
</style>
<style lang='scss' scoped>
.active-switch {
  white-space: nowrap;
  margin-right: 20px;
}
.top-container {
  border-bottom: 1px solid #ddd;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .publish-btn,
  .save-btn,
  .back-btn {
    font-size: 18px;
    height: 45px;
    margin-right: 10px;
  }
  .tag-select {
    height: 40px;
    margin-right: 20px;
  }
}
.title-input {
  font-size: 40px;
  padding: 0 30px;
}
.editor-container {
  height: calc(100vh - 110px);
}
</style>
