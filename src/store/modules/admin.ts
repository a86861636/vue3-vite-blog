import { defineStore, Store } from 'pinia'
export const useAdminStore: Store<any> = defineStore({
    id: 'layout',
    state: (): any => ({
        // 用户信息
        userInfo: {
            name: '',
            role: []
        }
    }),
    getters: {

    },
    actions: {

    }
})