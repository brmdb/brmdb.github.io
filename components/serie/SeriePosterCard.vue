<template>
  <nuxt-link
    :to="`/series/${serie.slug}`"
    :title="serie.title"
    class="volume-poster-card"
  >
    <img
      v-if="serie.posterUrl.length"
      :src="serie.posterUrl"
      :alt="serie.title"
    />
    <div v-else class="serie-poster-placeholder">
      <span class="icon is-medium">
        <b-icon icon="library-books" size="is-medium" />
      </span>
    </div>
    <div class="serie-title-overlay">
      {{ serie.title }}
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    serie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.volume-poster-card {
  border-radius: 3px;
  overflow: hidden;
  height: 230px;
  box-shadow: 0 2px 20px rgba($grey-dark, 0.2);
  display: inline-grid;
  grid-template-rows: auto min-content;

  &.is-full-height {
    height: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .serie-poster-placeholder {
    background-color: $grey-lighter;
    color: findColorInvert($grey-lighter);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    grid-column: 1;
    grid-row: 1 / 3;
  }

  .serie-title-overlay {
    background-color: rgba($dark, 0.8);
    color: findColorInvert($dark);
    padding: 12px;
    font-weight: 500;
    font-size: 0.85rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    grid-column: 1;
    grid-row: 2;
  }
}
</style>
