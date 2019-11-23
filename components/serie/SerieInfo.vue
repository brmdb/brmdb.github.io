<template>
  <div class="serie-info">
    <div class="serie-data">
      <div class="serie-data-header">Nomes alternativos</div>
      <div
        v-for="title in serie.alternativeTitles"
        :key="title"
        class="serie-data-value"
      >
        {{ title }}
      </div>
    </div>
    <div class="serie-data">
      <div class="serie-data-header">Formato</div>
      <div class="serie-data-value">{{ serie.type | serie_type }}</div>
    </div>
    <div class="serie-data">
      <div class="serie-data-header"><em>Status</em></div>
      <div class="serie-data-value">{{ serie.status | serie_status }}</div>
    </div>
    <div class="serie-data">
      <div class="serie-data-header">Demografia</div>
      <div class="serie-data-value">
        <em>{{ serie.demografy | serie_demografy }}</em>
      </div>
    </div>
    <div class="serie-data">
      <div class="serie-data-header">Gêneros</div>
      <div class="serie-data-value">
        <em>{{ serie.genres | serie_genres }}</em>
      </div>
    </div>
  </div>
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
.serie-info {
  background-color: $white;
  border-radius: 3px;
  padding: 18px;

  .serie-data {
    padding-bottom: 15px;

    &:last-of-type {
      padding-bottom: 0;
    }

    .serie-data-header {
      font-size: 0.9rem;
      font-weight: 500;
      padding-bottom: 5px;
    }

    .serie-data-value {
      font-size: 0.85rem;
      line-height: 1.3;
      color: $grey;
      padding-bottom: 5px;

      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }
}
</style>
