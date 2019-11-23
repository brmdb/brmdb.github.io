<template>
  <div>
    <app-navbar
      :color="$store.state.navbar.color"
      :spaced="$store.state.navbar.spaced"
      :fixed="$store.state.navbar.fixed"
      :transparent="$store.state.navbar.transparent"
    />

    <section class="main-content">
      <nuxt />
    </section>
  </div>
</template>

<script>
import AppNavbar from '~/components/AppNavbar'

export default {
  components: {
    AppNavbar
  },
  head() {
    return {
      title: 'BrMDb'
    }
  }
}
</script>
