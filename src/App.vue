<template>
  <v-app :style="{ background: $vuetify.theme.themes[theme].background }">
    <v-app-bar app>
      <v-tabs>
        <v-tab to="./">home</v-tab>
        <v-tab to="./about">about</v-tab>
      </v-tabs>
      <v-switch v-model="$vuetify.theme.dark"></v-switch>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
    <ScrollTop color="primary"></ScrollTop>
  </v-app>
</template>

<script>
const STORAGE_KEY = 'darkmode';
const themeStorage = {
  fetch: function () {
    const theme = JSON.parse(localStorage.getItem(STORAGE_KEY) || false);
    return theme;
  },
  save: function (theme) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  },
};

import ScrollTop from '@/components/ScrollTop.vue';

export default {
  name: 'App',
  components: {
    ScrollTop,
  },
  created() {
    this.$vuetify.theme.dark = themeStorage.fetch();
  },
  mounted() {
    const routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
  },
  computed: {
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  watch: {
    $route(routeInstance) {
      this.createTitleDesc(routeInstance);
    },
    theme: {
      handler(value) {
        value === 'dark' ? (value = true) : (value = false);
        themeStorage.save(value);
      },
      deep: true,
    },
  },
  methods: {
    createTitleDesc(routeInstance) {
      // title設定
      if (routeInstance.meta.title) {
        const setTitle = routeInstance.meta.title;
        document.title = setTitle;
      } else {
        document.title = 'title is not set';
      }
      // description設定
      if (routeInstance.meta.desc) {
        const setDesc = routeInstance.meta.desc;
        document
          .querySelector("meta[name='description']")
          .setAttribute('content', setDesc);
      } else {
        document
          .querySelector("meta[name='description']")
          .setAttribute('content', 'description is not set');
      }
    },
  },
};
</script>
