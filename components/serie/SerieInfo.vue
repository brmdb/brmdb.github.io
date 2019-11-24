<template>
  <div class="info-data-container">
    <div v-if="serie.alternativeTitles.length" class="info-data">
      <div class="info-data-header">Nomes alternativos</div>
      <div
        v-for="title in serie.alternativeTitles"
        :key="title"
        class="info-data-value"
      >
        {{ title }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Formato</div>
      <div class="info-data-value">{{ serie.type | serie_type }}</div>
    </div>
    <div class="info-data">
      <div class="info-data-header"><em>Status</em></div>
      <div class="info-data-value">{{ serie.status | serie_status }}</div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Demografia</div>
      <div class="info-data-value">
        <em>{{ serie.demografy | serie_demografy }}</em>
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Gêneros</div>
      <div class="info-data-value">
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
