<template>
  <div>
    <div class="btn-box">
      <!-- 新增功能 -->
      <el-button @click="dialogAddVisible = true" type="primary"
        >新增</el-button
      >
      <el-dialog title="新增课程分类" v-model="dialogAddVisible">
        <el-form :model="formAdd">
          <el-form-item label="分类名称">
            <el-input v-model="formAdd.category"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="addItem">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="分类id" width="150">
      </el-table-column>
      <el-table-column prop="category" label="分类名称" width="120">
      </el-table-column>
      <el-table-column prop="date_joined" label="创建时间"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            @click.prevent="delItem(scope.row)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        layout="prev, pager, next"
        @current-change="getList"
        :page-count="totalPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { categoryList, categoryAdd, categoryDel } from '/@/api/index'
export default defineComponent({
  name: 'Workplace',
  setup() {
    interface tableType {
      id: number
      category: string
      date_joined: string
    }
    const tableData: Ref<tableType[]> = ref([])
    const totalPage: Ref<number> = ref(2)
    async function getList(value: number = 1) {
      const res = await categoryList({ page: value, page_size: 10 })
      tableData.value = res.results
      totalPage.value = res.total
    }

    async function delItem(row: tableType) {
      await categoryDel({ id: row.id })
      getList()
    }

    const dialogAddVisible = ref(false)
    const formAdd = ref({
      category: '',
    })
    async function addItem() {
      await categoryAdd(formAdd.value)
      getList()
      dialogAddVisible.value = false
    }

    onMounted(() => {
      getList()
    })
    return {
      tableData,
      totalPage,
      getList,
      dialogAddVisible,
      formAdd,
      addItem,
      delItem,
    }
  },
})
</script>

<style scoped>
.btn-box {
  margin: 0 0 10px 0;
}
.pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
</style>