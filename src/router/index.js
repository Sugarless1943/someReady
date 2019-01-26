import Vue from 'vue'
import Router from 'vue-router'
import test from '@/components/test02'
import treeTable from '../alarm/alarmTable'
import alarmBar from '../alarm/alarmBar'
import alarmList from '../alarm/alarmList'
import selectTree from '../alarm/selectTree'
import alarmAlert from '../alarm/alarmAlert'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: alarmAlert
    }
  ]
})
