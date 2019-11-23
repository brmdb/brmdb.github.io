import Vue from 'vue'

const colorMapping = {
  Twitter: 'twitter',
  MyAnimeList: 'myanimelist',
  Kitsu: 'kitsu'
}

const iconMapping = {
  Twitter: 'twitter'
}

Vue.filter('link_color', (val) => 'is-' + (colorMapping[val] || 'grey'))
Vue.filter('link_favicon', (val) => iconMapping[val] || 'earth')

Vue.prototype.$filters = Vue.options.filters
