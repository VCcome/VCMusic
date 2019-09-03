import Vue from 'vue';
import './plugins/axios';
import './plugins/lazyload';
import App from './App.vue';
import router from './router/router';
import store from './store/index';

import 'common/scss/index.scss';

// Note: As of late 2015 most mobile browsers - notably Chrome and Safari - no longer have a 300ms touch delay, so fastclick offers no benefit on newer browsers, and risks introducing bugs into your application. Consider carefully whether you really need to use it.
// import FastClick from 'fastclick';
// FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
