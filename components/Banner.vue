<template>
  <section
    :style="{
      background: `url('${url}') center center`,
      backgroundSize: 'cover'
    }"
    class="hero is-medium is-dark is-cover"
  >
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
  computed: {
    url() {
      return this.imageUrl.length
        ? this.imageUrl
        : require('~/assets/default_banner.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  position: relative;

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
