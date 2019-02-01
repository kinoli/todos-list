import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TodoInfo from './views/TodoInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details/:id',
      name: 'todo-info',
      component: TodoInfo
    }
  ]
})
