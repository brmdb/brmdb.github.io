<template>
  <div class="serie-links">
    <a
      v-for="link in serie.externalLinks"
      :key="link.url"
      :href="link.url"
      :class="link.name | link_color"
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

<style lang="scss" scoped>
.serie-links {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;

  .button {
    flex: 1;
    font-size: 0.9rem;
    margin-left: 6px;
    margin-right: 6px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    .icon svg {
      margin-top: -0.05rem;
      vertical-align: middle;
    }
  }
}
</style>
