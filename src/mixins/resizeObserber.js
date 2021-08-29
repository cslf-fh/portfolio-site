export default {
  methods: {
    ResizeDocument(id) {
      const target = document.getElementById(`${id}`);
      const resizeObserver = new ResizeObserver((entries) => {
        entries.forEach(({ contentRect }) => {
          const { width, height } = contentRect;
          this.ResizeObserverWidth = width;
          this.ResizeObserverHeight = height;
        });
      });

      resizeObserver.observe(target);
    },
  },
};
