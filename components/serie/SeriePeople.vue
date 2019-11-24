<template>
  <div class="serie-people">
    <creator-short-card
      v-for="(creator, i) in serie.creators"
      :key="i"
      :creator="creator"
    />
  </div>
</template>

<script>
import CreatorShortCard from '~/components/people/CreatorShortCard'

export default {
  components: {
    CreatorShortCard
  },
  props: {
    serie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.serie-people {
  display: inline-grid;
  grid-gap: 1.75rem;
  grid-template-columns: 1fr 1fr 1fr;
}
</style>
