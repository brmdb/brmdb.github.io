<template>
  <div class="default-layout">
    <app-navbar
      v-if="!isIndex"
      :class="{ 'is-index': isIndex }"
      :color="$store.state.navbar.color"
      :spaced="$store.state.navbar.spaced"
      :fixed="$store.state.navbar.fixed"
      :transparent="$store.state.navbar.transparent"
    />

    <section class="main-content">
      <nuxt />
    </section>

    <app-footer />
  </div>
</template>

<script>
import AppFooter from '~/components/AppFooter'
import AppNavbar from '~/components/AppNavbar'

export default {
  components: {
    AppFooter,
    AppNavbar
  },
  computed: {
    isIndex() {
      return this.$nuxt.$route.name === 'index'
    }
  },
  head() {
    return {
      title: 'BrMDb'
    }
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
