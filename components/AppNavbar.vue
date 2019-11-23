<template>
  <nav
    :class="{
      'is-spaced': spaced,
      'is-fixed-top': fixed,
      'has-shadow': !transparent,
      'is-transparent-dark': transparent,
      [color]: true
    }"
    class="navbar header"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img svg-inline src="~/assets/logo.svg" alt="BrMDb" height="20" />
        </nuxt-link>

        <div class="navbar-burger">
          <span />
          <span />
          <span />
        </div>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            class="navbar-item"
          >
            {{ item.text }}
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: true
    },
    spaced: {
      type: Boolean,
      required: true
    },
    fixed: {
      type: Boolean,
      required: false,
      default: true
    },
    transparent: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      items: [
        { text: 'Séries', to: '/series' },
        { text: 'Editoras', to: '/publishers' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  transition: background 0.8s ease 0s, top 0.5s ease 0s;

  &.is-white .navbar-item svg {
    fill: $primary;
  }

  &.is-transparent-dark {
    background-color: rgba(0, 0, 0, 0.3);

    &:hover {
      background-color: $dark;
    }
  }

  .navbar-item svg {
    fill: currentColor;
  }
}
</style>
