import { createApp } from 'vue'
import App from '/@/App.vue'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import router from '/@/router/index'
import { pinia } from '/@/store'


import 'element-plus/lib/theme-chalk/index.css'

import '/@/assets/font/iconfont.css'

import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';

// highlightjs
import hljs from 'highlight.js';

VMdEditor.use(githubTheme, {
    Hljs: hljs,
    config: {
        toc: {
            includeLevel: [3, 4],
        },
    },
});

const app = createApp(App)
app.use(ElementPlus, { locale })
app.use(router)
app.use(VMdEditor)
app.use(pinia)
app.mount('#app')