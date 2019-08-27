import Vue from 'vue';
import './plugins/axios';
import App from './App.vue';
import router from './router/router';
import store from './store/store';

import 'common/scss/index.scss';

import FastClick from 'fastclick';

FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
