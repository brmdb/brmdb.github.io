<template>
  <div class="info-data-container is-column">
    <div class="info-data">
      <div class="info-data-header">Tipo</div>
      <div class="info-data-value">
        {{ edition.type | edition_type }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Papel</div>
      <div class="info-data-value">
        {{ edition.paper }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Capa</div>
      <div class="info-data-value">
        {{ edition.cover | edition_cover }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Lombada</div>
      <div class="info-data-value">
        {{ edition.bindingType | edition_binding }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Sobrecapa</div>
      <div class="info-data-value">
        {{ edition.hasJacket ? 'Sim' : 'Não' }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Dimensões <em>(cm)</em></div>
      <div class="info-data-value">
        {{ edition.dimensions.replace(/x/g, '×').replace(/\./g, ',') }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header"><em>Status</em></div>
      <div class="info-data-value">
        {{ edition.status | edition_status }}
      </div>
    </div>
    <div class="info-data">
      <div class="info-data-header">Período</div>
      <div class="info-data-value">
        {{ edition.period | edition_period }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    edition: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
