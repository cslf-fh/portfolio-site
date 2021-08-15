<template>
  <v-container class="text-center">
    <v-card id="about" ref="about" flat color="transparent">
      <v-card-title
        class="d-inline-flex text-h4 heading"
        v-text="headings[0]"
      ></v-card-title>
      <div class="py-4"></div>
      <About></About>
    </v-card>

    <div class="py-16"></div>

    <v-card id="portfolio" ref="portfolio" flat color="transparent">
      <div class="skew"></div>
      <v-card-title
        class="d-inline-flex text-h4 black--text heading heading--ex"
        v-text="headings[1]"
      ></v-card-title>
      <div class="py-4"></div>
      <Portfolio></Portfolio>
    </v-card>

    <div class="py-16"></div>

    <v-card id="contact" ref="contact" flat color="transparent">
      <v-card-title
        class="d-inline-flex text-h4 heading"
        v-text="headings[2]"
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

export default {
  name: 'Home',
  components: { About, Portfolio, ContactForm },
  data() {
    return {
      headings: ['About', 'Portfolio', 'Contact'],
    };
  },
};
</script>

<style lang="scss" scoped>
.heading {
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
    animation: bar 1s cubic-bezier(0.9, 0, 0.1, 1);
  }
  &--ex {
    &::after {
      background: linear-gradient(to right, #2acea2, #2cb8db);
    }
  }
}

@keyframes bar {
  0% {
    left: 50%;
    width: 0%;
  }
  100% {
    left: -50%;
    width: 200%;
  }
}

.skew {
  position: absolute;
  top: -5%;
  left: -50%;
  height: 110%;
  width: 200%;
  background: linear-gradient(180deg, #ffad00, #ff7400);
  transform: skewY(-3deg);
  z-index: 0;
}
</style>
