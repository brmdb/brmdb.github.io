<template>
  <section class="section">
    BrMDb
  </section>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('navbar/SET_FIXED', false)
  },
  meta: {
    navbar: {
      color: 'is-white',
      transparent: false,
      spaced: true
    }
  }
}
</script>
