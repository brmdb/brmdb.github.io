<template>
  <div>
    <banner :image-url="serie.coverUrl" />
    <serie-header :serie="serie" @tab-changed="onTabChanged" />
    <div class="serie-container container">
      <aside>
        <serie-info :serie="serie" />
      </aside>
    </div>
  </div>
</template>

<script>
import Banner from '~/components/Banner'
import SerieHeader from '~/components/serie/SerieHeader'
import SerieInfo from '~/components/serie/SerieInfo'

export default {
  components: {
    Banner,
    SerieHeader,
    SerieInfo
  },
  async asyncData({ $axios, params, error }) {
    try {
      return {
        serie: await $axios.$get(`/brmdb-data/series/slug/${params.slug}.json`)
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Série não encontrada.' })
    }
  },
  methods: {
    onTabChanged(activeTab) {
      // TODO
    }
  },
  validate({ params }) {
    return /^[a-zA-Z0-9-]+$/.test(params.slug)
  },
  meta: {
    navbar: {
      color: 'is-dark',
      transparent: true,
      fixed: true
    }
  },
  head() {
    return {
      title: `${this.serie.title} | BrMDb`
    }
  }
}
</script>

<style lang="scss" scoped>
.serie-container {
  display: grid;
  grid-column-gap: 40px;
  grid-template-columns: 215px auto;
  margin-top: 30px;
  position: relative;
}
</style>
