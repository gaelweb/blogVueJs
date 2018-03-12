import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HomeBlog'
import form from '@/components/FormBlog'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeBlog',
      component: HelloWorld
    },
    {
      path: '/FormBlog',
      name: 'FormBlog',
      component: form
    }
  ]
})
