import Vue from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import { analytics } from './plugins/firebase';
import axios from 'axios';
import './plugins/firebase';
import './assets/css/reset.css';
import anime from 'animejs/lib/anime.es.js';
import Mixins from './mixins/resizeObserber';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$anime = anime;
Vue.mixin(Mixins);

new Vue({
  router,
  vuetify,
  analytics,
  render: (h) => h(App),
}).$mount('#app');
