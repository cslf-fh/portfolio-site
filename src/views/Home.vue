<template>
  <v-container class="text-center">
    <v-card id="about" ref="about" flat color="transparent">
      <v-card-title
        :class="['d-inline-flex', 'text-h4', headings[0].target]"
        v-text="headings[0].heading"
      ></v-card-title>
      <div class="py-4"></div>
      <About></About>
    </v-card>

    <div class="py-16"></div>

    <v-card id="portfolio" ref="portfolio" flat color="transparent">
      <div class="background-gradation"></div>
      <v-card-title
        :class="['d-inline-flex', 'text-h4', headings[1].target]"
        v-text="headings[1].heading"
      ></v-card-title>
      <div class="py-4"></div>
      <Portfolio></Portfolio>
    </v-card>

    <div class="py-16"></div>

    <v-card id="contact" ref="contact" flat color="transparent">
      <v-card-title
        :class="['d-inline-flex', 'text-h4', headings[2].target]"
        v-text="headings[2].heading"
      ></v-card-title>
      <div class="py-4"></div>
      <ContactForm></ContactForm>
    </v-card>
  </v-container>
</template>

<script>
import About from '@/components/About.vue';
import Portfolio from '@/components/Portfolio.vue';
import ContactForm from '@/components/ContactForm.vue';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'Home',
  components: { About, Portfolio, ContactForm },
  data() {
    return {
      headings: [
        { heading: 'About', target: 'about', class: 'is-active' },
        { heading: 'Portfolio', target: 'portfolio', class: 'is-active--ex' },
        { heading: 'contact', target: 'contact', class: 'is-active' },
      ],
      ResizeObserverHeight: '',
    };
  },
  mounted() {
    this.animationSet();
    this.ResizeDocument('portfolio');
  },
  watch: {
    ResizeObserverHeight() {
      const headings = this.headings[2];
      this.animationHeadings(headings.target, headings.class);
    },
  },
  methods: {
    //ヘッディングのアニメーション
    animationHeadings(target, addClass) {
      gsap.fromTo(
        `.${target}`,
        { autoAlpha: 0, y: 72 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power2.out',
          duration: 1,
          scrollTrigger: {
            trigger: `.${target}`,
            start: 'top center',
            //markers: true,
            //ScrollTriggerイベント発火時にクラスを付けて、擬似要素のアニメーション開始
            toggleClass: {
              targets: `.${target}`,
              className: addClass,
            },
            once: true,
          },
          overwrite: true,
        }
      );
    },
    //マウント時にヘッディングへのアニメーションの付与
    animationSet() {
      for (const i of this.headings) {
        const target = i.target;
        const addClass = i.class;
        this.animationHeadings(target, addClass);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.is-active,
.is-active--ex {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 3.5rem;
    left: -50%;
    width: 200%;
    height: 0.2rem;
    background: linear-gradient(
      to right,
      rgba(245, 223, 77, 1),
      rgba(255, 152, 0, 1)
    );
    animation: bar 2s cubic-bezier(0.9, 0, 0.1, 1);
  }
}

.is-active--ex {
  &::after {
    background: linear-gradient(to right, #2acea2, #2cb8db);
  }
}

@keyframes bar {
  0%,
  50% {
    left: 50%;
    width: 0%;
  }
  100% {
    left: -50%;
    width: 200%;
  }
}

.background-gradation {
  position: absolute;
  top: -25px;
  left: -50vw;
  height: calc(100% + 50px);
  width: 200vw;
  background: linear-gradient(180deg, #ffad00, #ff7400);
  transform: skewY(-3deg);
  z-index: 0;
}
</style>
