<template>
  <section class="section">
    <div class="container search-page">
      <app-filter @filter="onFilterChanged" />
      <div class="results-column">
        <h2 v-if="!hasSearched" class="recent-added">
          Recentemente adicionados
        </h2>
        <serie-poster-card
          v-for="(serie, i) in seriesToShow"
          :key="i"
          :serie="serie"
        />
      </div>
    </div>
  </section>
</template>

<script>
import AppFilter from '~/components/browse/AppFilter'
import SeriePosterCard from '~/components/serie/SeriePosterCard'

export default {
  components: {
    AppFilter,
    SeriePosterCard
  },
  data() {
    return {
      filterOptions: {},
      hasSearched: false
    }
  },
  computed: {
    seriesToShow() {
      const { search, type } = this.filterOptions
      if (!search && !type) return this.recentSeries
      if (!search.length && type === 'ALL') return this.recentSeries
      if (!search.length) {
        return this.searchSeries.filter((s) => s.type === type)
      }

      const searchRegex = new RegExp(this.filterOptions.search, 'gi')
      return this.searchSeries.filter((s) => this.selectSerie(s, searchRegex))
    }
  },
  async asyncData({ $axios, params, error, store }) {
    try {
      return {
        recentSeries: await $axios.$get('series/recent.json'),
        searchSeries: await $axios.$get('series/list.json')
      }
    } catch (e) {
      store.commit('navbar/SET_TRANSPARENT', false)
      store.commit('navbar/SET_FIXED', false)
      error({
        statusCode: 500,
        message: 'Houve um erro ao se comunicar com o servidor'
      })
    }
  },
  mounted() {
    this.$store.commit('navbar/SET_FIXED', true)
  },
  methods: {
    selectSerie(serie, search) {
      return (
        (serie.title.match(search) ||
          serie.alternativeTitles.some((t) => t.match(search))) &&
        (this.filterOptions.type === 'ALL' ||
          serie.type === this.filterOptions.type)
      )
    },
    onFilterChanged(filterOptions) {
      this.hasSearched = true
      this.filterOptions = Object.assign({}, this.filterOptions, filterOptions)
    }
  },
  meta: {
    navbar: {
      color: 'is-primary',
      transparent: false
    }
  },
  head() {
    return {
      title: 'Explorar | BrMDb'
    }
  }
}
</script>

<style lang="scss" scoped>
.search-page {
  display: grid;
  grid-template-columns: 200px auto;
  grid-column-gap: 40px;
  padding-top: 50px;
}

.results-column {
  display: inline-grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.75rem;
}

.recent-added {
  font-weight: 500;
  font-size: 1.15rem;
  grid-column: span 5;
  grid-row: 1;
}
</style>
