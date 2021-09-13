// 动态路由名称映射表
const modules = import.meta.glob('../views/**/**.vue')
const components: IObject<() => Promise<typeof import('*.vue')>> = {
    adminLayout: (() => import('/@/adminLayout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
    layout: (() => import('/@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>
}
Object.keys(modules).forEach(key => {
    const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/)
    if (!nameMatch) return
    // 排除_Components文件夹下的文件
    if (nameMatch[1].includes('_Components')) return
    // 如果页面以Index命名，则使用父文件夹作为name
    const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
    let name = indexMatch ? indexMatch[1] : nameMatch[1];
    [name] = name.split('/').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
})


export {
    components
}
