<template>
  <span
    :class="[
      'scroll-bar',
      { 'scroll-bar--active': active },
      { 'scroll-bar--show': cursorIn || scrolling },
      { 'scroll-bar--hidden': !cursorIn && !scrolling },
    ]"
    :style="`width: ${width}px`"
    @mousemove="scrollBarGrab"
    @mouseup="mouseUp"
    @mouseleave.self="mouseOut"
  >
    <span
      :class="['scroll-bar__thumb']"
      :style="`width: ${width}px; background-color: ${color}`"
      @mousedown.left="mouseDown"
      @mouseenter.self="mouseOver"
    ></span>
  </span>
</template>

<script>
export default {
  name: 'ScrollBar',
  props: {
    width: { type: [Number, String], default: 16 },
    color: { type: String, default: '#ccc' },
  },
  data: () => ({
    ResizeObserverHeight: '',
    ResizeObserverWidth: '',
    heightDiff: '',
    heightQuot: '',
    scrollBarTruck: '',
    scrollBarThumbCursor: '',
    active: false,
    cursorIn: false,
    scrolling: false,
    setTime: false,
  }),
  async mounted() {
    await this.ResizeDocument('app'); //resizeObserverでドキュメントの高さの変更を検知(Mixin)
    this.scrollBar();
    window.addEventListener('scroll', this.scrollBarWheel);
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollBarWheel);
  },
  watch: {
    ResizeObserverHeight() {
      this.scrollBar();
    },
    ResizeObserverWidth() {
      this.scrollBar();
    },
  },
  methods: {
    //スクロールバーのトラックや高さの設定
    scrollBar() {
      const element = document.getElementById('app');
      const heightElement = element.offsetHeight; //ドキュメントの高さ
      const heightWindow = window.innerHeight; //ウィンドウ画面の高さ
      const heightDiff = heightElement - heightWindow;
      const heightQuot = heightElement / heightWindow;
      const heightPercentage = heightWindow / heightElement;
      const scrollBar = document.querySelector('.scroll-bar');
      const scrollBarThumb = document.querySelector('.scroll-bar__thumb');
      const scrollBarHeight = heightWindow; //スクロールバートラックの高さ
      const scrollBarThumbHeight = scrollBarHeight * heightPercentage; //スクロールバーの高さ
      const scrollBarTrack = scrollBarHeight - scrollBarThumbHeight;
      scrollBar.style.height = scrollBarHeight + 'px';
      scrollBarThumb.style.height = scrollBarThumbHeight + 'px';
      this.heightDiff = heightDiff;
      this.heightQuot = heightQuot;
      this.scrollBarTrack = scrollBarTrack;
    },
    //スクロールバーを掴んでスクロールする時の設定
    scrollBarGrab() {
      //スクロールバーがクリックされ、スクロールできる場合
      if (this.active && 0 < this.heightDiff) {
        //必要な値の取得
        const scrollBarThumb = document.querySelector('.scroll-bar__thumb');
        const heightDiff = this.heightDiff;
        const heightQuot = this.heightQuot;
        const scrollBarTrack = this.scrollBarTrack;
        const scrollBarThumbCursor = this.scrollBarThumbCursor;
        //トラック内のスクロールバーの位置
        let scrollBarY =
          event.pageY - window.pageYOffset - scrollBarThumbCursor;
        let scrollTo = scrollBarY * heightQuot; //ページのスクロール量
        scrollBarY < 0
          ? (scrollBarY = 0)
          : scrollBarY > scrollBarTrack
          ? (scrollBarY = scrollBarTrack) //ウィンドウ外に出ていかないように
          : null;
        scrollTo > heightDiff ? (scrollTo = heightDiff) : null; //ウィンドウより高くならないように
        scrollBarThumb.style.transform =
          'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,' + scrollBarY + ',0,1)';
        window.scrollTo({
          top: scrollTo,
        });
        this.scrolling = true; //classの切り替え用
      }
    },
    //タッチやマウスホイールでスクロールする時の設定
    scrollBarWheel() {
      //タッチやマウスホイールでスクロールされ、スクロールできる場合
      if (!this.active && 0 < this.heightDiff) {
        //必要な値の取得
        const heightQuot = this.heightQuot;
        const scrollBarThumb = document.querySelector('.scroll-bar__thumb');
        let offsetY = window.pageYOffset / heightQuot; //トラック内のスクロールバーの位置
        scrollBarThumb.style.transform =
          'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,' + offsetY + ',0,1)';
        //classの切り替え用
        this.scrolling = true;
        this.setTime ? clearTimeout(this.setTime) : false;
        this.setTime = setTimeout(
          function () {
            this.cursorIn ? null : (this.scrolling = false);
          }.bind(this),
          1000
        );
      }
    },
    //スクロールバーをクリックされた時の処理
    mouseDown() {
      this.active = true;
      const scrollBarThumb = document.querySelector('.scroll-bar__thumb');
      //スクロールバー内のクリック位置
      this.scrollBarThumbCursor =
        event.clientY - scrollBarThumb.getBoundingClientRect().top;
    },
    //スクロールバーからクリックが離れた時の処理
    mouseUp() {
      this.active = false;
    },
    //スクロールバー内にカーソルが入ってきた時の処理
    mouseOver() {
      this.setTime ? clearTimeout(this.setTime) : false;
      this.setTime = setTimeout(
        function () {
          this.cursorIn = true;
        }.bind(this),
        0
      );
    },
    //スクロールバー内からカーソルが出ていった時の処理
    mouseOut() {
      this.setTime ? clearTimeout(this.setTime) : false;
      this.setTime = setTimeout(
        function () {
          this.cursorIn = false;
        }.bind(this),
        1000
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-bar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 100;
  &__thumb {
    position: absolute;
    top: 0;
    right: 0;
    cursor: grab;
    transition: transform 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  &--active {
    padding: 100vh 100vw;
    cursor: grab;
  }
  &--show {
    opacity: 1;
    transition: opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1);
  }
  &--hidden {
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.32, 0, 0.67, 0);
  }
}
</style>
