<template>
  <div class="black--text carousel">
    <span class="text-h1 carousel__title">CSLF-<br />FH</span>
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
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  name: 'MyComponent',
  components: { VueSlickCarousel },
  data() {
    return {
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
  &__title {
    position: absolute;
    top: 15%;
    left: 10%;
    white-space: pre;
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
