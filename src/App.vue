<template>
  <v-app
    :style="{
      background: $vuetify.theme.themes[theme].background,
      overflow: 'hidden',
    }"
  >
    <Loading :loading="loading"></Loading>
    <v-app-bar app dark height="56">
      <router-link to="./">
        <v-btn
          outlined
          tile
          style="text-transform: none"
          @click="$vuetify.goTo(0), (section = 0)"
        >
          cslf-fh's web
        </v-btn>
      </router-link>
      <v-tabs
        v-if="$vuetify.breakpoint.smAndUp"
        v-model="section"
        class="mr-8"
        color="orange"
        right
        :hide-slider="section === 0"
      >
        <v-tab disabled></v-tab>
        <v-tab v-for="i in links" :key="i.name" @click="scroll(i.offsetY)">
          {{ i.name }}
        </v-tab>
      </v-tabs>
      <v-btn
        class="mr-n2"
        absolute
        top
        right
        icon
        style="margin-top: -14px"
        :class="{ rotate: $vuetify.theme.dark }"
        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
    </v-app-bar>
    <v-bottom-navigation
      v-if="$vuetify.breakpoint.xsOnly"
      v-model="section"
      background-color="#272727"
      color="orange"
      dark
      app
      shift
      grow
    >
      <v-btn class="d-none"> </v-btn>
      <v-btn v-for="i in links" :key="i.name" text @click="scroll(i.offsetY)">
        <span v-text="i.name"></span>
        <v-icon>{{ i.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <Carousel></Carousel>

    <v-main>
      <v-tabs>
        <v-tab to="/">home</v-tab>
        <v-tab to="/about">about</v-tab>
        <v-tab to="/storage">storage</v-tab>
        <v-tab to="/anime">anime</v-tab>
      </v-tabs>
      <router-view />
    </v-main>

    <div class="py-16"></div>

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
        <v-col v-if="$vuetify.breakpoint.xsOnly" cols="12">
          <div class="py-7"></div>
        </v-col>
      </v-row>
    </v-footer>

    <ScrollTop
      :class="{ 'mb-14': $vuetify.breakpoint.xsOnly }"
      color="orange"
    ></ScrollTop>
    <ScrollBar :width="5" color="orange"></ScrollBar>
  </v-app>
</template>

<script>
//ダークモードの状態保持
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
import Loading from '@/components/Loading.vue';
import ScrollBar from '@/components/ScrollBar.vue';

export default {
  name: 'App',
  components: {
    ScrollTop,
    Carousel,
    Shares,
    Loading,
    ScrollBar,
  },
  data() {
    return {
      section: 0, //現在の表示箇所をナビゲーションのvalueに渡す値
      sectionMargin: 300, //SwitchNavigationによるエフェクトの余白
      //リンクに関する値
      links: [
        { name: 'about', offsetY: '', icon: 'mdi-account' },
        {
          name: 'portfolio',
          offsetY: '',
          icon: 'mdi-file-table-box-multiple',
        },
        { name: 'contact', offsetY: '', icon: 'mdi-email' },
      ],
      loading: true, //Loading.vueに渡す値
      ResizeObserverHeight: '', //resizeObserverから受け取る高さ
      ResizeObserverWidth: '', //resizeObserverから受け取る幅
    };
  },
  created() {
    this.$vuetify.theme.dark = themeStorage.fetch();
  },
  mounted() {
    const routeInstance = this.$route;
    this.createTitleDesc(routeInstance);
    this.offsets();
    window.addEventListener('scroll', this.SwitchNavigation);
    //ローディング画面を非表示に
    setTimeout(() => {
      this.loading = false;
    }, 2000);
    this.ResizeDocument('app'); //resizeObserverでドキュメントの高さの変更を検知(Mixin)
  },
  destroyed() {
    window.removeEventListener('scroll', this.SwitchNavigation);
  },
  computed: {
    //テーマの切り替え
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  watch: {
    //ページ遷移時
    $route(routeInstance) {
      this.createTitleDesc(routeInstance);
      setTimeout(() => {
        this.offsets();
      }, 100);
    },
    //テーマの設定の保存
    theme: {
      handler(value) {
        value === 'dark' ? (value = true) : (value = false);
        themeStorage.save(value);
      },
      deep: true,
    },
    //ドキュメントの高さの変更を検知した時の処理
    ResizeObserverHeight() {
      this.offsets();
    },
    //ドキュメントの幅の変更を検知した時の処理
    ResizeObserverWidth() {
      this.offsets();
    },
  },
  methods: {
    //メタデータ設定
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
    //スクロール対象のページ上端からの距離を取得
    offsets() {
      if (this.$route.path === '/') {
        for (const i of this.links) {
          const id = i.name;
          const element = document.getElementById(id);
          i.offsetY = element.getBoundingClientRect().top + window.pageYOffset; //dataの配列に格納(ウィンドウ上端からの距離 + スクロール量)
        }
      }
    },
    //受け取った高さへのスクロール
    scroll(offsetY) {
      return this.$vuetify.goTo(offsetY);
    },
    //スクロール量で表示するナビゲーションを設定
    SwitchNavigation() {
      const height = [];
      const offset = window.pageYOffset; //ページ上端からのスクロール量
      //ページ下端への到達(ページの高さ - 画面サイズ)
      const bottom =
        document.getElementById('app').offsetHeight - window.innerHeight;
      for (const i of this.links) {
        height.push(i.offsetY - this.sectionMargin);
      }
      this.$route.path !== '/'
        ? (this.section = 0)
        : height[0] <= offset && offset < height[1]
        ? (this.section = 1)
        : height[1] <= offset && offset < height[2]
        ? (this.section = 2)
        : height[2] <= offset && offset < bottom
        ? (this.section = 3)
        : (this.section = 0);
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

.rotate {
  transform: scale(-1, 1);
}
</style>
