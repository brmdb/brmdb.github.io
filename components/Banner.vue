<template>
  <section :style="{ background }" class="hero is-medium is-dark is-cover">
    <div class="overlay"></div>
  </section>
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    background() {
      return this.imageUrl.length && this.loaded
        ? `url(${this.imageUrl}) center center / cover`
        : undefined
    }
  },
  mounted() {
    if (this.imageUrl.length) {
      const img = new Image()
      img.onload = () => (this.loaded = true)
      img.src = this.imageUrl
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;
  background: url('~assets/default_banner.jpg') center center / cover;
  transition: background-image 0.8s ease;

  &.is-cover {
    height: 40vh;
  }

  .overlay {
    position: absolute;
    bottom: 0;
    top: 0;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(6, 13, 34, 0) 40%,
      rgba(6, 13, 34, 0.6)
    );
  }
}
</style>
