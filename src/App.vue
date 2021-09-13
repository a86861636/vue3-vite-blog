<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import cloudbase from '@cloudbase/js-sdk'
export default defineComponent({
  name: 'App',
  setup() {
    onMounted(() => {
      const tcb = cloudbase.init({
        env: 'hello-cloudbase-1gb74wcc56f7348a',
      })
      const db = tcb.database()
      db.collection('article')
        .get()
        .then((res) => {
          // res.data 包含该记录的数据
          console.log(res)
        })
    })
  },
})
</script>
