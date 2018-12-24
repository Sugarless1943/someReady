import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import treeTable from '../alarm/DemoTreeTable'
import alarmBar from '../alarm/alarmBar'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'alarmBar',
      component: alarmBar
    }
  ]
})
