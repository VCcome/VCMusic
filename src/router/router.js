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
      component: () => import(/* webpackChunkName: "recommend" */ '../views/recommend/recommend.vue')
    },
    {
      path: '/singer',
      component: () => import(/* webpackChunkName: "singer" */ '../views/singer/singer.vue'),
      children: [
        {
          path: ':id',
          component: () => import(/* webpackChunkName: "singer" */ '../views/singer-detail/singer-detail.vue')
        }
      ]
    },
    {
      path: '/rank',
      component: () => import(/* webpackChunkName: "rank" */ '../views/rank/rank.vue')
    },
    {
      path: '/search',
      component: () => import(/* webpackChunkName: "search" */ '../views/search/search.vue')
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
