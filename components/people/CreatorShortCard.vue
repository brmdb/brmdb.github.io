<template>
  <div class="creator-short-card">
    <img
      v-if="creator.person.imageUrl"
      :src="creator.person.imageUrl"
      :alt="creator.person.name"
    />
    <div v-else class="creator-image-placeholder">
      <span class="icon is-medium">
        <b-icon icon="account" size="is-medium" />
      </span>
    </div>
    <div class="creator-card-body">
      <span class="creator-name">
        {{ creator.person.name }}
      </span>
      <span class="creator-role">
        {{ creator.role }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    creator: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.creator-short-card {
  background-color: $white;
  border-radius: 3px;
  height: 100px;
  display: inline-grid;
  grid-template-columns: 100px auto;
  overflow: hidden;

  @include touch {
    height: 75px;
    grid-template-columns: 75px auto;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .creator-image-placeholder {
    background-color: $grey-lighter;
    color: findColorInvert($grey-lighter);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .creator-card-body {
    padding: 10px;
    display: inline-grid;
    grid-template-rows: auto min-content;
  }

  .creator-name {
    font-weight: 500;
    font-size: 0.95rem;
  }

  .creator-role {
    font-size: 0.8rem;
    color: $grey;
  }
}
</style>
