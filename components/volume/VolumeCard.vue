<template>
  <div class="volume-card">
    <img v-if="volume.coverUrl" :src="volume.coverUrl" alt="Capa do volume" />
    <div v-else class="volume-cover-placeholder">
      <span class="icon is-medium">
        <b-icon icon="book" size="is-medium" />
      </span>
    </div>
    <div class="volume-card-body">
      <span class="volume-number">
        {{ volumeNumber }}
      </span>
      <h3 class="volume-name">
        {{ volume.name }}
      </h3>
      <span class="volume-price">
        {{ volumePrice }}
      </span>
      <span class="volume-date">
        {{ volumeDate }}
      </span>
      <span v-if="volume.isbn || volume.issn" class="volume-code" title="ISBN">
        {{ volumeCode }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    volume: {
      type: Object,
      required: true
    }
  },
  computed: {
    volumeNumber() {
      if (this.volume.number === 'U') return 'Vol. único'
      if (!isNaN(parseInt(this.volume.number)))
        return 'Vol. #' + this.volume.number
      return this.volume.number
    },
    volumePrice() {
      return this.volume.price.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
    },
    volumeDate() {
      return new Date(this.volume.releaseDate).toLocaleString('pt-BR', {
        dateStyle: 'short'
      })
    },
    volumeCode() {
      return (this.volume.isbn || this.volume.issn).replace(
        /(\d{3})(\d{2})(\d{3})(\d{4})(\d)/,
        '$1-$2-$3-$4-$5'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.volume-card {
  background: $white;
  border-radius: 3px;
  height: 190px;
  display: inline-grid;
  grid-template-columns: 125px auto;
  overflow: hidden;
  color: $text;

  @include touch {
    grid-template-columns: 130px 1fr;
  }

  &.has-shadow {
    box-shadow: 0 2px 20px rgba($dark, 0.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .volume-cover-placeholder {
    background-color: $grey-lighter;
    color: findColorInvert($grey-lighter);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .volume-card-body {
    padding: 10px;
    display: inline-grid;
    grid-template-rows: min-content auto min-content min-content min-content;
  }

  .volume-number,
  .volume-code,
  .volume-date {
    font-size: 0.8rem;
    color: $grey;
  }

  .volume-name {
    font-weight: 500;
    font-size: 0.95rem;
  }

  .volume-price {
    font-size: 0.9rem;
  }

  .volume-code,
  .volume-date {
    font-feature-settings: 'tnum' 1;
  }
}
</style>
