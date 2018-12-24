import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import treeTable from '../alarm/DemoTreeTable'
import alarmBar from '../alarm/alarmBar'
import alarmList from '../alarm/alarmList'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'alarmList',
      component: alarmList
    }
  ]
})
