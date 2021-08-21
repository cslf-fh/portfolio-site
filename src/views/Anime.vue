<template>
  <div>
    <Logo></Logo>
  </div>
</template>

<script>
import Logo from '../assets/logo.svg';

export default {
  name: 'HelloWorld',
  components: { Logo },
  mounted() {
    window.addEventListener('load', this.hello);
  },
  methods: {
    hello() {
      this.$anime
        .timeline({
          targets: '#logo path',
          easing: 'easeInOutSine',
          direction: 'normal',
        })
        .add(
          {
            strokeDashoffset: [this.$anime.setDashoffset, 0],
            duration: 1000,
            delay: function (el, i) {
              return i * 250;
            },
          },
          0
        )
        .add(
          {
            fill: ['transparent', '#000000'],
          },
          '-=200'
        );
    },
  },
};
</script>

<style lang="scss" scoped>
#logo {
  position: relative;
  left: 10%;
}
</style>
