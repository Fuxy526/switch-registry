import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Bus from './plugins/bus';
import Message from './plugins/message';
import Modal from '@fuxy526/vue-modal';
import './assets/styles/modal/modal-switch-registry.scss';

Vue.config.productionTip = false;

Vue.use(Bus);
Vue.use(Message);
Vue.use(Modal, {
  skin: 'switch-registry',
  width: 360,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
