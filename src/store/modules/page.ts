import { defineStore } from 'pinia'
export const usePageStore: any = defineStore({
    id: 'page',
    state: () => ({
        ready: false
    })
})