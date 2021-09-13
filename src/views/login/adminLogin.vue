<template>
  <div id="adminLogin">
    <div class="loginForm" @keyup="enterSubmit">
      <el-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        class="rule-form"
        auto-complete="on"
        label-position="left"
      >
        <h3 class="title">{{ title }}</h3>

        <el-form-item prop="name">
          <el-input placeholder="请输入账号" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item prop="pwd">
          <el-input
            placeholder="请输入密码"
            v-model="form.pwd"
            show-password
          ></el-input>
        </el-form-item>

        <el-button
          type="primary"
          style="width: 100%; margin-bottom: 30px"
          @click.prevent="onSubmit"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useAdminStore } from '/@/store/modules/admin'
import { ElNotification } from 'element-plus'
import { validate } from '/@/utils/formExtend'

const formRender = () => {
  const { login } = useAdminStore()
  const title = '管理系统'
  let form = reactive({
    name: 'admin',
    pwd: 'admin',
  })
  const ruleForm = ref(null)
  const enterSubmit = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }
  const onSubmit = async () => {
    let { name, pwd } = form
    if (!(await validate(ruleForm))) return
    await login({ username: name, password: pwd })
    ElNotification({
      title: '欢迎',
      message: '欢迎回来',
      type: 'success',
    })
  }
  const rules = reactive({
    name: [
      {
        validator: (
          rule: any,
          value: any,
          callback: (arg0?: Error | undefined) => void
        ) => {
          if (!value) {
            return callback(new Error('用户名不能为空'))
          }
          callback()
        },
        trigger: 'blur',
      },
    ],
    pwd: [
      {
        validator: (
          rule: any,
          value: any,
          callback: (arg0?: Error | undefined) => void
        ) => {
          if (!value) {
            return callback(new Error('密码不能为空'))
          }
          callback()
        },
        trigger: 'blur',
      },
    ],
  })
  return {
    title,
    form,
    onSubmit,
    enterSubmit,
    rules,
    ruleForm,
  }
}
export default defineComponent({
  name: 'Login',
  setup() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      ...formRender(),
    }
  },
})
</script>

<style lang="scss" scoped>
#adminLogin {
  width: 100vw;
  height: 100vh;
  background: #2d3a4b;
}
.loginForm {
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  width: 370px;
  padding: 10px 30px;
  background: white;
  border-radius: 10px;
}
.title {
  margin: 0;
  padding: 20px 0;
  text-align: center;
}
</style>
