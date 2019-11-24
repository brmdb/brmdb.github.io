<template>
  <div class="label-short-card">
    <img :src="label.logoUrl" class="label-logo" />
    <div class="label-info">
      <span class="label-name">
        {{ label.name }}
      </span>
      <span class="label-publisher">
        {{ label.publisher.name }}
      </span>
    </div>
    <a :href="label.publisher.site" title="Site oficial">
      <b-icon icon="earth"></b-icon>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.label-short-card {
  background: $white;
  border-radius: 3px;
  padding: 8px;
  display: inline-grid;
  grid-template-columns: 3rem auto 2rem;
  align-items: center;
  grid-column-gap: 8px;

  .label-logo {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
  }

  .label-info {
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .label-name {
    font-weight: 500;
    font-size: 0.9rem;
    width: 100%;
  }

  .label-publisher {
    font-size: 0.8rem;
    color: $grey;
  }
}
</style>
