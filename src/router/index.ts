import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import { components } from '/@/router/asyncRouter'

const Components: IObject<() => Promise<typeof import('*.vue')>> = Object.assign({}, components, {
    // adminLayout: (() => import('/@/adminLayout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    // layout: (() => import('/@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>
})
console.log(components)
// 静态路由页面
export const allowRouter: Array<any> = [
    {
        path: '/',
        redirect: "/home"
    },
    {
        path: "/home",
        name: "layout",
        component: components.layout,
        children: [{
            name: 'home',
            path: '/home',
            component: components.home
        }, {
            name: 'article',
            path: '/article',
            component: components.article
        }, {
            name: 'search',
            path: '/search',
            component: components.search
        }]
    }, {
        name: 'adminLogin',
        path: '/adminLogin',
        component: components.adminLogin
    }, {
        path: "/admin",
        name: "admin",
        component: components.adminLayout,
        children: [{
            name: 'adminArticle',
            meta: {
                title: '文章管理'
            },
            path: '/adminArticle',
            component: components.adminArticle
        }]
    }, {
        name: 'editArticle',
        path: '/editArticle',
        component: components.editArticle
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: allowRouter as RouteRecordRaw[]
})

export default router