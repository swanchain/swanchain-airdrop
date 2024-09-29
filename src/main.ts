import './assets/style/main.css'

import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
app.use(VueAwesomeSwiper)

import router from './router'
app.use(router)
app.mount('#app')


// import version from '../version';
// console.log(`Commit Hash: ${version.commitHash}`);
// console.log(`Branch: ${version.branch}`);