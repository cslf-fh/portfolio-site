import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import axios from 'axios';
import './plugins/firebase';
import './assets/css/reset.css';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
