import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: () => import(/* webpackChunkName: "about" */ '../views/recommend/recommend.vue')
    },
    {
      path: '/singer',
      component: () => import(/* webpackChunkName: "about" */ '../views/singer/singer.vue')
    },
    {
      path: '/rank',
      component: () => import(/* webpackChunkName: "about" */ '../views/rank/rank.vue')
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "about" */ '../views/search/search.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  ]
});
