// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import commonFiltes from './filters'

Vue.config.productionTip = false
Vue.use(elementUi)

// 注册全局过滤器
Object.keys(commonFiltes).forEach(key => {
  Vue.filter(key, commonFiltes[key])
})


/* eslint-disable no-new */
let vm = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
