<template>
  <div class="serie-header">
    <div class="container header-container">
      <div
        :class="{ 'is-overlapping-banner': serie.bannerUrl.length }"
        class="cover-container"
      >
        <div
          :class="{ 'is-absolute': !serie.bannerUrl.length }"
          class="cover-inner"
        >
          <img :src="serie.posterUrl" :alt="serie.title" class="serie-cover" />
          <serie-links :serie="serie" />
        </div>
      </div>
      <div class="content-container has-banner">
        <h1 class="title is-4">{{ serie.title }}</h1>
        <div
          ref="synopsis"
          v-html="$md.render(serie.synopsis)"
          :style="{ height: showLongText ? `${textHeight}px` : '150px' }"
          class="content"
        ></div>
        <span
          v-if="textIsLong && !showLongText"
          @click="showLongText = !showLongText"
          class="synopsis-length-toggle"
        >
          Ler mais
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
      textIsLong: false,
      textHeight: 150,
      showLongText: false,
      tabActive: 'EDITIONS',
      tabs: [
        { text: 'Edições', name: 'EDITIONS' },
        { text: 'Criadores', name: 'PEOPLE' }
      ]
    }
  },
  mounted() {
    const synopsisEl = this.$refs.synopsis
    this.textIsLong = synopsisEl.clientHeight < synopsisEl.scrollHeight
    this.textHeight = synopsisEl.scrollHeight
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
    position: relative;
    margin-top: -125px;

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
    min-height: 0px;

    &.has-banner {
      min-height: 250px;
    }

    h1.title {
      font-size: 1.4rem;
      font-weight: 400;
      margin-bottom: 0;
    }

    .content {
      padding: 15px 0;
      margin-bottom: 0;
      font-size: 0.95rem;
      height: 150px;
      overflow-y: hidden;
      transition: height 0.2s ease-out;
    }

    .synopsis-length-toggle {
      background: linear-gradient(0deg, $white 30%, rgba($white, 0.4));
      color: $grey;
      cursor: pointer;
      font-size: 0.85rem;
      font-weight: 500;
      margin-top: -50px;
      padding-bottom: 5px;
      padding-top: 20px;
      text-align: center;
      transition: 0.2s;
      z-index: 10;

      &:hover {
        color: $grey-dark;
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
