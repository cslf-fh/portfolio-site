<template>
  <div>
    <VueSlickCarousel v-bind="settings">
      <v-img
        v-for="i in 5"
        :key="i"
        :class="'slide' + i"
        :src="url + i + size"
        :lazy-src="url + i + size"
        max-height="300px"
        gradient="to top right, rgba(255,255,255,.33), rgba(255,255,255,.7)"
      />
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
</style>
