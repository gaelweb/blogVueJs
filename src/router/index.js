import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HomeBlog'
import FormBlog from '@/components/FormBlog'
// import BackOffice from '@/components/BackOffice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeBlog',
      component: HelloWorld
    },
    {
      path: '/admin/FormBlog',
      name: 'FormBlog',
      component: FormBlog
    }
  ]
})
