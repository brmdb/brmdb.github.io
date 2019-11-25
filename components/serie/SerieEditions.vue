<template>
  <div class="serie-editions">
    <div
      v-for="edition in serie.editions"
      :key="edition.id"
      class="serie-edition"
    >
      <h2 class="edition-name">{{ edition.name }}</h2>
      <div class="edition-container">
        <volume-card
          v-for="volume in edition.volumes"
          :key="volume.id"
          :volume="volume"
        />
        <section v-if="!edition.volumes.length" class="edition-empty">
          <p>
            <span class="icon is-large">
              <b-icon icon="emoticon-sad" custom-size="mdi-48px" />
            </span>
          </p>
          <p>Nenhum volume cadastrado.</p>
        </section>
        <div class="edition-info-container">
          <edition-info :edition="edition" />
          <label-short-card :label="edition.label" />
          <edition-links :edition="edition" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditionInfo from '~/components/edition/EditionInfo'
import EditionLinks from '~/components/edition/EditionLinks'
import VolumeCard from '~/components/volume/VolumeCard'
import LabelShortCard from '~/components/label/LabelShortCard'

export default {
  components: {
    EditionInfo,
    EditionLinks,
    VolumeCard,
    LabelShortCard
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
.serie-editions {
  .serie-edition {
    margin-bottom: 1.75rem;

    .edition-name {
      font-weight: 500;
      margin-bottom: 8px;
      font-size: 1.15rem;
    }

    .edition-container {
      display: grid;
      grid-column-gap: 1.75rem;
      grid-row-gap: 1.75rem;
      grid-template-columns: 1fr 1fr 1fr;
    }

    .edition-info-container {
      grid-column: 3;
      grid-row: 1 / 3;
      display: inline-grid;
      grid-row-gap: 1.75rem;
    }

    .edition-empty {
      grid-row: 1 / 3;
      grid-column: 1 / 3;
      color: $grey;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      p {
        display: block;
      }

      p:first-child {
        margin-bottom: 0.7em;
      }
    }
  }
}
</style>
