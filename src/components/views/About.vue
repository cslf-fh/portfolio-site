<template>
  <v-row class="centered" no-gutters>
    <v-col cols="12" sm="5" align-self="center">
      <v-avatar class="avatar" size="200">
        <v-img :src="about.image"></v-img>
      </v-avatar>
    </v-col>
    <v-col class="py-4 d-sm-none" cols="12"></v-col>
    <v-col cols="12" sm="7" align-self="center">
      <v-card
        :class="{ 'text-left': $vuetify.breakpoint.smAndUp }"
        flat
        color="transparent"
      >
        <v-card-text
          class="
            ityped-text
            d-inline
            white-space
            text--primary text-subtitle-1
            px-0
          "
        ></v-card-text>
        <span class="ityped-cursor text-h6">|</span>
        <div class="py-2"></div>
        <v-divider></v-divider>
        <div class="py-2"></div>
        <v-card-text
          class="ityped-language d-inline white-space text-subtitle-1 px-0"
        ></v-card-text>
        <span class="ityped-cursor text-h6 gray--text">|</span>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { storage } from '@/plugins/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { init } from 'ityped'; //タイピングアニメーションのプラグイン

export default {
  data() {
    return {
      about: [],
    };
  },
  created() {
    if (process.env.VUE_APP_MODE === 'production') {
      this.getStorage();
    } else {
      import('../../assets/api.json').then((object) => {
        const data = object.about;
        this.about = data;
        this.textSettings();
      });
    }
  },
  mounted() {
    this.avatar();
  },
  methods: {
    getStorage() {
      this.about = [];
      const storageRef = ref(storage, 'assets/api.json');
      getDownloadURL(storageRef)
        .then((url) => {
          return this.$axios.get(url);
        })
        .then((response) => {
          const data = response.data.about;
          this.about = data;
          this.textSettings();
        });
    },
    //アバタのアニメーション
    avatar() {
      gsap.fromTo(
        '.avatar',
        { autoAlpha: 0, x: -100 },
        {
          autoAlpha: 1,
          x: 0,
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: '.avatar',
            start: 'center center',
            //markers: true,
          },
        }
      );
    },
    //テキストのタイピングアニメーション
    textTyped(trigger, text, start) {
      //タイピングアニメーションの設定
      function initType() {
        const target = document.querySelector(trigger);
        init(target, {
          strings: text, //配列で渡す
          disableBackTyping: true, //繰り返しをしない
          showCursor: false, //デフォルトのカーサを非表示(ScrollTriggerイベント発火前は非表示のため)
        });
      }
      //イベント発火タイミングの設定
      ScrollTrigger.create({
        trigger: trigger,
        start: `${start} center`,
        onEnter: initType,
        once: true,
        //markers: true,
      });
      this.textCursor();
    },
    //カーサのアニメーション
    textCursor() {
      const tl = gsap.timeline({
        repeat: -1,
      });
      tl.to('.ityped-cursor', {
        visibility: 'hidden',
      }).to('.ityped-cursor', {
        visibility: 'visible',
      });
    },
    //itypedに渡す関数
    textSettings() {
      this.about.text.push(this.about.text.join('\n')); //タイピングアニメーションで最後に全部表示するために、結合し追加
      this.textTyped('.ityped-text', this.about.text, 'top');
      this.textTyped('.ityped-language', this.about.language, 'bottom');
    },
  },
};
</script>

<style lang="scss" scoped>
.centered {
  padding: 0 5ch;
}

.white-space {
  white-space: pre-line;
  word-break: break-word;
}
</style>
