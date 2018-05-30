import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'
import About from './views/About'

// const Home = r => require.ensure([], () => r(require('@/views/Home')), 'Home')
// const About = r => require.ensure([], () => r(require('@/views/About')), 'About')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

router.beforeEach((to, from, next) => {
  // getWxUserInfo
  next()
})

export default router
