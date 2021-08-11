<template>
  <v-app
    :style="{
      background: $vuetify.theme.themes[theme].background,
      overflow: 'hidden',
    }"
  >
    <v-app-bar app dark>
      <router-link to="./">
        <v-btn outlined tile style="text-transform: none">
          cslf-fh's web
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <v-tabs
        v-if="$vuetify.breakpoint.smAndUp"
        v-model="tabs"
        color="orange"
        right
        :hide-slider="tabs === 0"
      >
        <v-tab disabled></v-tab>
        <v-tab v-for="i in links" :key="i.name" :to="i.link">
          {{ i.name }}
        </v-tab>
        <v-btn
          class="mt-1 mr-4"
          icon
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
      </v-tabs>
      <div v-else>
        <v-btn
          class="mt-n3 mr-10"
          absolute
          top
          right
          icon
          @click="$vuetify.theme.dark = !$vuetify.theme.dark"
        >
          <v-icon>mdi-invert-colors</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-fab-transition>
          <v-btn
            v-if="!drawer"
            class="mt-n3 mr-n2"
            absolute
            top
            right
            icon
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-fab-transition>
          <v-btn v-if="drawer" class="mt-n3 mr-n2" absolute top right icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-fab-transition>
      </div>
    </v-app-bar>
    <v-navigation-drawer
      class="text-center"
      v-model="drawer"
      dark
      app
      bottom
      temporary
    >
      <v-list nav dark>
        <v-list-item-group color="orange">
          <v-list-item v-for="i in links" :key="i.name" :to="i.link">
            <v-list-item-title>{{ i.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <Shares class="ma-auto"></Shares>
      </template>
    </v-navigation-drawer>
    <Carousel></Carousel>

    <v-main>
      <v-tabs>
        <v-tab to="./">home</v-tab>
        <v-tab to="./about">about</v-tab>
      </v-tabs>
      <router-view />
    </v-main>

    <v-spacer class="py-16"></v-spacer>

    <v-footer dark color="transparent">
      <div class="skew--footer"></div>
      <v-row no-gutters align="center" justify="space-around">
        <Shares size="32"></Shares>
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
        <v-card flat color="transparent">
          <v-card-text class="white--text">
            ©2021 -
            {{
              new Date().getFullYear() === 2021
                ? null
                : new Date().getFullYear()
            }}
            cslf-fh All Rights Reserved
          </v-card-text>
        </v-card>
      </v-row>
    </v-footer>
    <ScrollTop color="orange"></ScrollTop>
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
import Carousel from '@/components/Carousel.vue';
import Shares from '@/components/Shares.vue';

export default {
  name: 'App',
  components: {
    ScrollTop,
    Carousel,
    Shares,
  },
  data() {
    return {
      drawer: false,
      tabs: 0,
      links: [
        { name: 'about', link: './#about' },
        { name: 'portfolio', link: './#portfolio' },
        { name: 'contact', link: './#contact' },
      ],
    };
  },
  created() {
    this.$vuetify.theme.dark = themeStorage.fetch();
  },
  mounted() {
    const routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
    setTimeout(
      function () {
        this.transition = true;
      }.bind(this),
      0
    );
    window.addEventListener('load', this.scrollLoaded); //画像読み込み後にスクロール
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
    scrollLoaded() {
      const hash = this.$route.hash; //ハッシュ取得
      if (hash !== '') {
        const id = hash.replace('#', ''); //#削除
        const element = document.getElementById(id);
        const offset = element.getBoundingClientRect().top; //ブラウザ表示領域上端からの相対距離
        const height = offset + window.pageYOffset; //+ ドキュメント上端からのスクロール量
        this.$vuetify.goTo(height);
      }
    },
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

<style lang="scss">
body {
  &::-webkit-scrollbar {
    display: none;
    -webkit-appearance: none;
  }
}

.skew {
  &--footer {
    position: absolute;
    top: -5%;
    left: -50%;
    height: 200%;
    width: 200%;
    background: #272727;
    transform: skewY(-3deg);
    z-index: 0;
  }
}
</style>
