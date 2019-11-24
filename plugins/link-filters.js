import Vue from 'vue'

const colorMapping = {
  Twitter: 'twitter',
  MyAnimeList: 'myanimelist',
  Kitsu: 'kitsu',
  BBM: 'bbm',
  'Guia dos Quadrinhos': 'gdc'
}

const iconMapping = {
  Twitter: 'twitter',
  BBM: 'book-open-page-variant'
}

Vue.filter(
  'link_color',
  (val) =>
    'is-' +
    (val.includes('Catálogo') ? 'catalogue' : colorMapping[val] || 'grey')
)
Vue.filter('link_favicon', (val) =>
  val.includes('Catálogo') ? 'domain' : iconMapping[val] || 'earth'
)

Vue.prototype.$filters = Vue.options.filters
