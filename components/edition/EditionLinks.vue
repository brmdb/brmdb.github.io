<template>
  <div class="links">
    <a
      v-for="link in edition.externalLinks"
      :key="link.url"
      :href="link.url"
      :class="link.name | link_color"
      :title="link.name"
      rel="nofollow"
      target="_blank"
      class="button is-white"
    >
      <span class="icon">
        <b-icon
          v-if="!isSvg(link.name)"
          :icon="link.name | link_favicon"
          custom-size="mdi-18px"
        />
        <img
          v-if="link.name === 'MyAnimeList'"
          src="~/assets/mal.svg"
          svg-inline
        />
        <img
          v-if="link.name === 'Guia dos Quadrinhos'"
          src="~/assets/gdc.svg"
          svg-inline
        />
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    edition: {
      type: Object,
      required: true
    }
  },
  methods: {
    isSvg(name) {
      return ['Guia dos Quadrinhos'].includes(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.links {
  margin: 0;
}
</style>
