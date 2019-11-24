<template>
  <div>
    <banner :image-url="serie.bannerUrl" />
    <serie-header
      ref="serieHeader"
      :serie="serie"
      @tab-changed="onTabChanged"
    />
    <div class="serie-container container">
      <aside>
        <serie-info :serie="serie" :serie-header-ref="serieHeader" />
      </aside>
      <serie-editions :serie="serie" v-if="activeTab === 'EDITIONS'" />
    </div>
  </div>
</template>

<script>
import Banner from '~/components/Banner'
import SerieHeader from '~/components/serie/SerieHeader'
import SerieInfo from '~/components/serie/SerieInfo'
import SerieEditions from '~/components/serie/SerieEditions'

export default {
  components: {
    Banner,
    SerieHeader,
    SerieInfo,
    SerieEditions
  },
  data() {
    return {
      activeTab: 'EDITIONS',
      serieHeader: {}
    }
  },
  async asyncData({ $axios, params, error, store }) {
    try {
      return { serie: await $axios.$get(`/api/series/slug/${params.slug}`) }
    } catch (e) {
      store.commit('navbar/SET_TRANSPARENT', false)
      store.commit('navbar/SET_FIXED', false)
      error({ statusCode: 404, message: 'Série não encontrada' })
    }
  },
  mounted() {
    this.serieHeader = this.$refs.serieHeader
  },
  methods: {
    onTabChanged(activeTab) {
      this.activeTab = activeTab
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
