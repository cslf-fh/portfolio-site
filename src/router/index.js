import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Storage from '../views/Storage.vue';
import goTo from 'vuetify/lib/services/goto';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(goTo(scrollTo));
      }, 0);
    });
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        title: `cslf-fh's web`,
        desc: `This is a cslf-fh's website. Thank you for watching`,
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: { title: `About | cslf-fh's web`, desc: 'About' },
    },
    {
      path: '/storage',
      name: 'Storage',
      component: Storage,
      meta: { title: `Storage | cslf-fh's web`, desc: 'Storage' },
    },
  ],
});
