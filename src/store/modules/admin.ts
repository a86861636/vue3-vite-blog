import { defineStore } from 'pinia'
import { auth } from '/@/tcb/index'
import { useLogin } from '/@/tcb/api'
import router from '/@/router';

//监听tcb登录情况，更新pinia里的用户信息
auth.onLoginStateChanged((loginState) => {
  useAdminStore().updateLoginState()
});

//获取需要的用户信息
function getUserInfo() {
  if (auth.hasLoginState()) {
    let data = auth.currentUser
    return {
      uid: data.uid,
      nickName: data.nickName,
      email: data.email,
      avatarUrl: data.avatarUrl,
    }
  } else {
    return {}
  }
}

export const useAdminStore: any = defineStore({
  id: 'admin',
  state: () => ({
    pageReady: false,
    // 用户信息
    userInfo: getUserInfo(),
    loginState: auth.hasLoginState() ? true : false
  }),
  getters: {

  },
  actions: {
    updateLoginState() {
      console.log('updateLoginState')
      this.userInfo = getUserInfo()
      this.loginState = auth.hasLoginState() ? true : false
      console.log(this.userInfo)
    },
    async login(username, password) {
      let param = {
        email: username,
        password: password
      }
      return (await useLogin(param))
    },
    logout() {
      auth.signOut()
      router.push({ path: '/adminLogin' })
    }
  }
})