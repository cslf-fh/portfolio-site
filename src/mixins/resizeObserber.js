export default {
  methods: {
    ResizeDocument(id) {
      const target = document.getElementById(`${id}`);
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ contentRect }) => {
          const { width, height } = contentRect; //x, y, width, height, top, right, bottom, left
          this.ResizeObserverWidth = width;
          this.ResizeObserverHeight = height;
        });
      });

      resizeObserver.observe(target); //検知開始
      //resizeObserver.unobserve(target); //検知終了
      //resizeObserver.disconnect(target); //全ての検知終了
    },
  },
};
