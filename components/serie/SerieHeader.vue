<template>
  <div class="serie-header">
    <div class="container header-container">
      <div class="cover-container">
        <div class="cover-inner">
          <img :src="serie.posterUrl" :alt="serie.title" class="serie-cover" />
          <serie-links :serie="serie" />
        </div>
      </div>
      <div class="content-container">
        <h1 class="title is-4">{{ serie.title }}</h1>
        <div v-html="$md.render(synopsis)" class="content"></div>
        <span
          v-if="serie.synopsis.length > textSize && !showLongText"
          @click="showLongText = !showLongText"
          class="synopsis-length-toggle"
        >
          {{ toggleText }}
        </span>
        <nav class="header-navbar">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            :class="{ 'is-active': tabActive === tab.name }"
            @click="toggleActiveTab(tab.name)"
            class="header-navbar-item"
          >
            {{ tab.text }}
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import SerieLinks from '~/components/serie/SerieLinks'

export default {
  components: {
    SerieLinks
  },
  props: {
    serie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      textSize: 440,
      showLongText: false,
      tabActive: 'EDITIONS',
      tabs: [
        { text: 'Edições', name: 'EDITIONS' },
        { text: 'Pessoas', name: 'PEOPLE' }
      ]
    }
  },
  computed: {
    synopsis() {
      return this.serie.synopsis.length < this.textSize || this.showLongText
        ? this.serie.synopsis
        : this.serie.synopsis.slice(0, this.textSize) + '...'
    },
    toggleText() {
      return this.showLongText ? 'Ler menos' : 'Ler mais'
    }
  },
  methods: {
    toggleActiveTab(tab) {
      this.tabActive = tab
      this.$emit('tab-changed', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.serie-header {
  background-color: $white;
  position: relative;

  .header-container {
    display: grid;
    grid-column-gap: 30px;
    grid-template-columns: 215px auto;
    min-height: 250px;
  }

  .cover-container {
    margin-top: -125px;
    position: relative;

    .serie-cover {
      background-color: rgba(212, 230, 245, 0.5);
      border-radius: 2px;
      box-shadow: 0 0 29px rgba(49, 54, 68, 0.25);
      margin-top: 15px;
      width: 100%;
      border-style: none;
      vertical-align: text-top;
    }
  }

  .content-container {
    display: inline-grid;
    grid-template-rows: min-content min-content auto;
    padding-top: 25px;

    h1.title {
      font-size: 1.4rem;
      font-weight: 400;
      margin-bottom: 0;
    }

    .content {
      padding: 15px 0;
      margin-bottom: 0;
      font-size: 0.95rem;

      &:hover + .synopsis-length-toggle {
        opacity: 1;
      }
    }

    .synopsis-length-toggle {
      background: linear-gradient(0deg, $white 30%, rgba($white, 0.4));
      color: $grey;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      margin-top: -50px;
      opacity: 0;
      padding-bottom: 5px;
      padding-top: 20px;
      text-align: center;
      transition: 0.2s;

      &:hover {
        opacity: 1;
      }
    }
  }

  .header-navbar {
    align-self: end;
    display: flex;
    justify-content: space-evenly;
    justify-self: center;
    padding-top: 10px;
    width: 100%;
    font-size: 0.85rem;

    .header-navbar-item {
      padding: 15px;
      color: lighten($grey, 10%);
      transition: 0.15s;

      &.is-active {
        color: $grey-darker;
        font-weight: 500;
      }

      &:hover {
        color: $primary;
      }
    }
  }
}
</style>
