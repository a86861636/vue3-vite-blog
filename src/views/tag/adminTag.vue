<template>
  <div class="table">
    <div class="fnc-container">
      <el-button class="add-btn" type="primary" @click="showAddDialog">新增</el-button>
    </div>
    <el-table :data="tagsList" style="width: 100%">
      <el-table-column prop="_id" label="id" width="350px"></el-table-column>
      <el-table-column prop="name" label="标签名"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button
            class="remove-btn"
            @click="removeItem(scope.row._id)"
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="addDialogVisible" title="新增标签" width="30%" center>
      <el-form>
        <el-form-item label="标签名">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="addItem">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, Ref } from 'vue'
import { getTagsList, addTag, removeTag } from '/@/tcb/api'
import type { ITagsRes, IAddTagParam } from '/@/tcb/api'
import { ElNotification } from 'element-plus'

let tagsList: Ref<ITagsRes[]> = ref([])

//新增
let addDialogVisible: Ref<boolean> = ref(false)
let addForm: Ref<IAddTagParam> = ref({
  name: ''
})
function showAddDialog() {
  addDialogVisible.value = true
  addForm.value.name = ''
}
async function addItem() {
  if (!addForm.value.name) {
    return
  }
  if (await addTag(addForm.value)) {
    ElNotification({
      title: '系统提示',
      message: '操作成功',
      type: 'success',
    })
    addDialogVisible.value = false
    tagsList.value = await getTagsList()
  } else {
    ElNotification({
      title: '系统提示',
      message: '操作失败',
      type: 'warning',
    })
  }
  console.log('addItem')
}

//删除
async function removeItem(id: string) {
  if (await removeTag(id)) {
    ElNotification({
      title: '系统提示',
      message: '操作成功',
      type: 'success',
    })
    tagsList.value = await getTagsList()
  } else {
    ElNotification({
      title: '系统提示',
      message: '操作失败',
      type: 'warning',
    })
  }
}
onMounted(async () => {
  tagsList.value = await getTagsList()
  console.log(tagsList.value)
})
</script>

<style scoped>
.fnc-container {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
