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
  head() {
    return {
      title: 'BrMDb'
    }
  }
}
</script>
