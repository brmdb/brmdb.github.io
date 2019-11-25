<template>
  <nav
    id="navbar"
    :class="{
      'is-spaced': spaced,
      'is-fixed-top': fixed,
      'is-transparent-dark': isTransparent,
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

        <div
          @click="toggleMenu"
          :class="{ 'is-active': menuShowing }"
          class="navbar-burger"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div :class="{ 'is-active': menuShowing }" class="navbar-menu">
        <div class="navbar-start">
          <nuxt-link
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            active-class="is-active"
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
import { mapState } from 'vuex'

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
      items: [{ text: 'Explorar', to: '/browse' }],
      currScrollPos: 0,
      prevScrollPos: 0
    }
  },
  computed: {
    isTransparent() {
      return this.$store.state.navbar.transparent && this.currScrollPos < 200
    },
    ...mapState({ menuShowing: (state) => state.navbar.menuShowing })
  },
  beforeMount() {
    this.prevScrollPos = window.pageYOffset
    this.currScrollPos = this.prevScrollPos
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.currScrollPos = window.pageYOffset
      const navbar = document.getElementById('navbar')

      if (this.$store.state.navbar.fixed) {
        if (this.prevScrollPos > this.currScrollPos) {
          navbar.style.transform = 'translateY(0)'
          this.$store.commit('navbar/SET_SHOWING', true)
        } else {
          navbar.style.transform = `translateY(-${navbar.clientHeight + 3}px)`
          this.$store.commit('navbar/SET_SHOWING', false)
        }
        this.prevScrollPos = this.currScrollPos
      }
    },
    toggleMenu() {
      this.$store.commit('navbar/SET_MENU_SHOWING', !this.menuShowing)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  transition: background 0.8s ease 0s, top 0.5s ease 0s, transform 0.5s ease 0s,
    padding 0.5s ease 0s;
  border-top: 3px solid $primary;

  &.is-primary {
    border-top-color: darken($primary, 5%);
  }

  &.is-white .navbar-item svg {
    fill: $primary;
  }

  &.is-transparent-dark {
    background-color: rgba(0, 0, 0, 0.5);

    &:hover {
      background-color: $dark;
    }
  }

  .navbar-item svg {
    fill: currentColor;
  }
}
</style>
