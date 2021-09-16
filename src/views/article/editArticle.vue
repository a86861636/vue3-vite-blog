<template>
  <div id="editArticle">
    <div class="top-container">
      <el-input
        class="title-input"
        v-model="articleFrom.title"
        maxlength="50"
        placeholder="请输入文章标题"
      ></el-input>
      <el-button class="save-btn">保存</el-button>
      <el-button class="draft-btn">草稿箱</el-button>
    </div>
    <v-md-editor
      class="editor-container"
      :include-level="[3, 4]"
      v-model="text"
      :disabled-menus="[]"
      @upload-image="handleUploadImage"
      height="100vh"
    ></v-md-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { uploadFile } from '/@/tcb/api'
// import { getArticleDetail } from '/@/tcb/api'
export default defineComponent({
  setup() {
    async function handleUploadImage(
      event: Event,
      insertImage: Function,
      files: File[]
    ) {
      // 拿到 files 之后上传到文件服务器，然后向编辑框中插入对应的内容
      console.log(event)
      console.log(files[0])
      let res = await uploadFile(files[0])

      // 此处只做示例
      insertImage({
        url: res.download_url,
        desc: files[0].name,
        width: '250px',
        height: '250px',
      })
    }

    const articleFrom = ref({
      title: '',
      content: '',
    })
    return { handleUploadImage, articleFrom }
  },
})
</script>
<style lang='scss'>
#editArticle {
  .el-input__inner {
    height: 100px;
    border: 0;
  }
}
</style>
<style lang='scss' scoped>
.top-container {
  border-bottom: 1px solid #ddd;
}
.title-input {
  font-size: 40px;
  padding: 0 30px;
}
</style>
