<template>
  <div class="links">
    <a
      v-for="link in serie.externalLinks"
      :key="link.url"
      :href="link.url"
      :class="link.name | link_color"
      :title="link.name"
      rel="nofollow"
      target="_blank"
      class="button is-white"
    >
      <span class="icon">
        <b-icon :icon="link.name | link_favicon" v-if="!isSvg(link.name)" />
        <img
          v-if="link.name === 'MyAnimeList'"
          src="~/assets/mal.svg"
          svg-inline
        />
        <img v-if="link.name === 'Kitsu'" src="~/assets/kitsu.svg" svg-inline />
      </span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    serie: {
      type: Object,
      required: true
    }
  },
  methods: {
    isSvg(name) {
      return ['MyAnimeList', 'Kitsu'].includes(name)
    }
  }
}
</script>
