import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/index.css'
// import en from 'element-plus/es/locale/lang/en'
import commonFun from '@/utils/common'
import 'amfe-flexible'

const app = createApp(App)
app.config.globalProperties.$commonFun = commonFun
app
    // .use(ElementPlus, {
    //         locale: en,
    //     })
    .use(store)
    .use(router)
app.mount('#app')