<template>
  <div class="black--text carousel">
    <Logo class="carousel__logo"></Logo>
    <span class="carousel__scroll">SCROLL</span>
    <VueSlickCarousel v-bind="settings">
      <v-img
        v-for="i in 5"
        :key="i"
        :class="'slide' + i"
        :src="url + i + size"
        :lazy-src="url + i + size"
        height="600px"
        gradient="to top right, rgba(255,255,255,.33), rgba(255,255,255,.7)"
      ></v-img>
    </VueSlickCarousel>
  </div>
</template>

<script>
import Logo from '../assets/logo.svg'; //svgファイルの読み込み

import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'MyComponent',
  components: { VueSlickCarousel, Logo },
  data() {
    return {
      //カルーセルの設定
      settings: {
        arrow: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 6000,
        speed: 3000,
        pauseOnHover: false,
      },
      url: 'https://picsum.photos/id/',
      size: '/1920',
    };
  },
  mounted() {
    window.addEventListener('load', this.logo);
  },
  methods: {
    //ロゴのアニメーション
    logo() {
      this.$anime
        .timeline({
          targets: '#logo path',
          easing: 'easeInOutSine',
          direction: 'normal',
        })
        .add({
          duration: 3500, //ローディング画面表示時間
        })
        .add({
          strokeDashoffset: [this.$anime.setDashoffset, 0],
          duration: 1000,
          delay: function (el, i) {
            return i * 250;
          },
        })
        .add({
          fill: ['transparent', '#000'],
        });
      this.logoRepeat();
    },
    //ロゴのアニメーションの繰り返し表示
    logoRepeat() {
      setInterval(
        function () {
          this.$anime
            .timeline({
              targets: '#logo path',
              easing: 'easeInOutSine',
              direction: 'alternate',
            })
            .add({ fill: ['#000', 'rgba(0, 0, 0, .0)'] })
            .add({
              strokeDashoffset: [0, this.$anime.setDashoffset],
              duration: 1000,
              delay: function (el, i) {
                return i * 250;
              },
              endDelay: 500,
            });
        }.bind(this),
        18000
      );
    },
  },
};
</script>

<style lang="scss">
@for $i from 1 through 5 {
  .slide#{$i} {
    .v-image__image {
      width: 200vw !important;
      animation: slide 60s linear #{($i - 1) * 6}s infinite;
    }
  }
}

@keyframes slide {
  100% {
    transform: translateX(-500px);
  }
}

.carousel {
  position: relative;
  &__logo {
    position: absolute;
    top: 15%;
    left: 10%;
    z-index: 1;
  }
  &__scroll {
    position: absolute;
    bottom: 5%;
    right: 10%;
    height: 20%;
    width: 60px;
    writing-mode: vertical-rl;
    z-index: 1;
    overflow: hidden;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 50%;
      width: 2px;
      height: 100%;
      transform: translate(-50%, -50%);
      background-color: #000;
      z-index: 1;
      visibility: hidden;
      animation: bar 3s cubic-bezier(0.9, 0, 0.1, 1) 0.5s infinite;
    }
  }
}

@keyframes bar {
  0% {
    transform: translateY(-100%);
    visibility: visible;
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
