<template>
  <div v-if="visible" class="loading">
    <div v-for="i in 32" :key="i" :class="'overlay' + i"></div>
    <div class="loader">
      <v-card
        class="mx-1 loader__box"
        v-for="i in 10"
        :key="'grid' + i"
        color="white"
        width="12"
        height="12"
        tile
      ></v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: { type: Boolean, default: true },
  },
  data: () => ({
    visible: true,
  }),
  mounted() {
    this.loader();
    //ローディング画面表示時にスクロール禁止
    document.addEventListener('touchmove', this.noScroll, { passive: false });
    document.addEventListener('mousewheel', this.noScroll, { passive: false });
  },
  updated() {
    //ローディング画面非表示時にスクロール禁止を解除
    document.removeEventListener('touchmove', this.noScroll, {
      passive: false,
    });
    document.removeEventListener('mousewheel', this.noScroll, {
      passive: false,
    });
  },
  watch: {
    //App.vueマウント完了後、ローディング画面を非表示に
    loading: {
      handler() {
        this.overlay();
        this.loaderOut();
        setTimeout(() => {
          this.visible = false;
        }, 2000);
      },
    },
  },
  methods: {
    //オーバーレイのアニメーション
    overlay() {
      for (let i = 1; i < 33; i++) {
        this.$anime({
          targets: `.overlay${i}`,
          translateX: `${this.$anime.random(-150, 150)}vw`,
          translateY: '-150vh',
          scale: 0.1,
          skew: 120,
          duration: 500,
          delay: i * 50,
          direction: 'normal',
          easing: 'easeInSine',
        });
      }
    },
    //ローダのアニメーション
    loader() {
      this.$anime({
        targets: '.loader__box',
        scale: [
          { value: 0.1, easing: 'easeOutSine', duration: 250 },
          { value: 1, easing: 'easeInOutQuad', duration: 600 },
        ],
        delay: this.$anime.stagger(50, { grid: [10, 1], from: 0 }),
        loop: true,
      });
    },
    //ローダのフェードアウト
    loaderOut() {
      this.$anime({
        targets: '.loader__box',
        opacity: [1, 0],
        easing: 'easeOutSine',
        duration: 1000,
      });
    },
    //スクロール禁止のイベント設定用関数
    noScroll(event) {
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;
  z-index: 100;
}

@for $i from 1 through 32 {
  .overlay#{$i} {
    position: absolute;
    border-style: solid;
    @if $i % 2 == 1 {
      border-width: 25.2vh 25.2vw 0 0;
      border-color: #000 transparent transparent transparent;
    } @else {
      border-width: 0 0 25vh 25vw;
      border-color: transparent transparent #000 transparent;
    }
    @if $i / 24 > 1 {
      top: 75vh;
    } @else if $i / 16 > 1 {
      top: 50vh;
    } @else if $i / 8 > 1 {
      top: 25vh;
    }
    @if $i % 8 > 6 or $i % 8 == 0 {
      left: 75vw;
    } @else if $i % 8 > 4 {
      left: 50%;
    } @else if $i % 8 > 2 {
      left: 25%;
    }
  }
}

.loader {
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
