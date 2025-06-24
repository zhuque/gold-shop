import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from "pinia";
export function createApp() {
  const app = createSSRApp(App)
  const pinia = Pinia.createPinia()
  app.use(pinia);
  
  pinia.use(({ store }) => {
    store.$subscribe(() => {
      uni.setStorageSync(store.$id, JSON.stringify(store.$state))
    })
  })
  
  return {
    app,
	Pinia
  }
}

// #endif