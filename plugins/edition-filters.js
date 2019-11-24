import Vue from 'vue'

const typeMapping = {
  NORMAL: 'Normal',
  DELUXE: 'Luxo'
}

const statusMapping = {
  ANNOUNCED: 'Anunciado',
  PUBLISHING: 'Em publicação',
  FINISHED: 'Finalizado',
  CANCELLED: 'Cancelado',
  HIATUS: 'Em hiato',
  UNKNOWN: 'Indefinido'
}

const periodMapping = {
  MONTHLY: 'Mensal',
  BIMONTHLY: 'Bimestral',
  TRIMONTHLY: 'Trimestral',
  QUADRIMONTHLY: 'Quadrimestral',
  UNDEFINED: 'Indefinido'
}

const coverMapping = {
  SOFT: 'Cartão',
  HARD: 'Dura'
}

const bindingMapping = {
  CASE_BOUND: 'Canoa',
  PERFECT_BOUND: 'Quadrada',
  SADDLE_STITCHED: 'Grampeada'
}

Vue.filter('edition_type', (val) => typeMapping[val] || val)
Vue.filter('edition_status', (val) => statusMapping[val] || val)
Vue.filter('edition_period', (val) => periodMapping[val] || val)
Vue.filter('edition_cover', (val) => coverMapping[val] || val)
Vue.filter('edition_binding', (val) => bindingMapping[val] || val)
