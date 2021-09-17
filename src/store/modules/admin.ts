import { defineStore } from 'pinia'
import { auth } from '/@/tcb/index'
import { useLogin } from '/@/tcb/api'

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
      avatarUrl: data.avatarUrl,
    }
  } else {
    return {}
  }
}

export const useAdminStore: any = defineStore({
  id: 'admin',
  state: () => ({
    // 用户信息
    userInfo: getUserInfo(),
    loginState: auth.hasLoginState() ? true : false
  }),
  getters: {

  },
  actions: {
    updateLoginState() {
      this.userInfo = getUserInfo()
      this.loginState = auth.hasLoginState() ? true : false
    },
    async login(username, password) {
      let param = {
        email: username,
        password: password
      }
      return (await useLogin(param))
    }
  }
})