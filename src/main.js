import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ToggleButton from 'vue-js-toggle-button';
import Modal from './plugins/modal';

Vue.config.productionTip = false;

Vue.use(ToggleButton);
Vue.use(Modal);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
