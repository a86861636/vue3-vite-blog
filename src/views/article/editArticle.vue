<template>
  <div id="editArticle">
    <v-md-editor
      :include-level="[3, 4]"
      v-model="text"
      @upload-image="handleUploadImage"
      height="100vh"
    ></v-md-editor>
  </div>
</template>

<script>
export default {
  components: {},
}
</script>
